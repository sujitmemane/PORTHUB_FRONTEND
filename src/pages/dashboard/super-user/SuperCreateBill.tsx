import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Plus, Edit, Trash2 } from "lucide-react";

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import ApiClient from "@/lib/axios";
import ManageCategories from "@/components/category/ManageCategories";
import useAuth from "@/hooks/useAuth";

const formatCurrencyPlain = (amount) => {
  return amount.toLocaleString("en-IN");
};

const numberToWords = (num) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  if (num === 0) return "Zero";
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100)
    return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
  if (num < 1000)
    return (
      ones[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 ? " " + numberToWords(num % 100) : "")
    );
  if (num < 100000)
    return (
      numberToWords(Math.floor(num / 1000)) +
      " Thousand" +
      (num % 1000 ? " " + numberToWords(num % 1000) : "")
    );
  if (num < 10000000)
    return (
      numberToWords(Math.floor(num / 100000)) +
      " Lakh" +
      (num % 100000 ? " " + numberToWords(num % 100000) : "")
    );

  return "Amount too large";
};

const generateBarcode = () => {
  return "|||||| || ||| || |||| | ||| |||| || ||| | |||| ||";
};

const generateInvoiceNumber = () => {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-6);
  return `INV${timestamp}`;
};

const SuperCreateBill = () => {
  const { user } = useAuth();
  const [template, setTemplate] = useState({});

  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMode, setPaymentMode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentUser, setPaymentUser] = useState(null);

  const fetchCategories = async (orgId: string) => {
    try {
      const response = await ApiClient.get(
        `/categories/organizations/${orgId}`
      );
      if (response?.data?.success) {
        setCategories(response?.data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    if (user?.organization) {
      fetchCategories(user.organization);
    }
  }, [user]);
  const [description, setDescription] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [items, setItems] = useState([
    { name: "", category: "", qty: 1, rate: "", amount: "" },
  ]);

  const debouncedQuery = useDebounce(query, 500);

  const fetchStudents = async () => {
    try {
      const response = await ApiClient.get(
        `/students/search?query=${debouncedQuery}`
      );
      console.log(response, "Fetched Students");
      if (response?.data?.success) {
        setStudents(response?.data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const fetchTemplate = async () => {
    try {
      const response = await ApiClient.get("/organizations/template");

      if (response?.data?.success) {
        setTemplate({
          ...response.data.data,
          themeColor: response.data.data.themeColor || "#000000",
        });
      }
    } catch (error) {
      console.error("Failed to fetch template:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [debouncedQuery]);

  useEffect(() => {
    fetchTemplate();
  }, []);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    if (field === "qty" || field === "rate") {
      const qty =
        field === "qty"
          ? parseFloat(value) || 0
          : parseFloat(updated[index].qty) || 0;
      const rate =
        field === "rate"
          ? parseFloat(value) || 0
          : parseFloat(updated[index].rate) || 0;
      updated[index].amount = (qty * rate).toString();
    }

    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", category: "", qty: 1, rate: "", amount: "" },
    ]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (parseFloat(item.amount) || 0);
    }, 0);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setStudentId(student.studentId);
    setQuery(student.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudent || !studentId) {
      alert("Please select a student and enter student ID");
      return;
    }

    if (items.some((item) => !item.category || !item.rate)) {
      alert("Please fill all required fields for items");
      return;
    }

    const billData = {
      invoiceNumber,
      student: selectedStudent,
      studentId,
      dueDate,
      description,
      items: items.filter((item) => item.category && item.rate),
      total: calculateTotal(),
    };

    // Mock API call
    try {
      console.log("Bill data:", billData);
      alert("Bill created successfully!");
      // Reset form
      setSelectedStudent(null);
      setStudentId("");
      setDescription("");
      setQuery("");
      setItems([{ name: "", category: "", qty: 1, rate: "", amount: "" }]);
      setInvoiceNumber(generateInvoiceNumber());
    } catch (error) {
      console.error("Failed to create bill:", error);
      alert("Failed to create bill. Please try again.");
    }
  };

  const total = calculateTotal();
  const totalInWords = numberToWords(total);

  // Filter students based on query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.studentId.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Input form */}
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Create New Bill
                </CardTitle>
                <Button
                  size="sm"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Manage Categories
                </Button>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-4">
              <div className="space-y-6">
                {/* Student Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Select Student</Label>
                  <Command className="border rounded-md">
                    <CommandInput
                      placeholder="Search students..."
                      value={query}
                      onValueChange={setQuery}
                    />
                    <CommandList className="max-h-40">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <CommandItem
                            key={student.id}
                            onSelect={() => handleStudentSelect(student)}
                            className="cursor-pointer"
                          >
                            {student.name} ({student.studentId}) - Class{" "}
                            {student.class}
                            {student.section}
                          </CommandItem>
                        ))
                      ) : (
                        <CommandItem disabled>No students found</CommandItem>
                      )}
                    </CommandList>
                  </Command>
                </div>

                {/* Student ID and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Student ID *</Label>
                    <Input
                      placeholder="Enter Student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Date</Label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Class & Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Class *</Label>
                    <Input
                      placeholder="Class"
                      value={selectedStudent?.class || ""}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Section</Label>
                    <Input
                      placeholder="Section"
                      value={selectedStudent?.section || ""}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>

                {/* Description */}

                {/* Payment Mode */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 w-full">
                    <Label className="text-sm font-medium">
                      Payment Mode *
                    </Label>
                    <Select
                      value={paymentMode}
                      onValueChange={(value) => setPaymentMode(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {["CASH", "ONLINE"].map((m, index) => (
                          <SelectItem key={index} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMode === "ONLINE" && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Transaction ID *
                      </Label>
                      <Input
                        placeholder="Enter Transaction ID"
                        value={transactionId || ""}
                        onChange={(e) => setTransactionId(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* Bill Items */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Bill Items *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addItem}
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-4 bg-gray-50"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Item {index + 1}
                          </span>
                          {items.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        {/* Item Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Item Name</Label>
                            <Input
                              placeholder="Enter item name"
                              value={item.name}
                              onChange={(e) =>
                                handleItemChange(index, "name", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Category *</Label>
                            <Select
                              value={item.category}
                              onValueChange={(value) =>
                                handleItemChange(index, "category", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat.id} value={cat.name}>
                                    {cat.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Quantity</Label>
                            <Input
                              type="number"
                              min="1"
                              value={item.qty}
                              onChange={(e) =>
                                handleItemChange(index, "qty", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Rate *</Label>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              value={item.rate}
                              onChange={(e) =>
                                handleItemChange(index, "rate", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Amount</Label>
                            <Input
                              type="number"
                              value={item.amount}
                              readOnly
                              className="bg-gray-100"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₹ {formatCurrencyPlain(total)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    In words: {totalInWords} Rupees
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full h-12 text-lg font-semibold"
                >
                  Generate Bill
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Bill Preview */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="bg-white border m-4 print:m-0 print:shadow-none print:border-black text-xs">
                {/* Business Header */}
                <div className="text-center py-6 border-b">
                  <h1
                    className="text-xl font-bold mb-2"
                    style={{ color: template.themeColor }}
                  >
                    {template.orgName}
                  </h1>
                  <h2 className="text-sm font-semibold mb-2">
                    {template.orgPlace}
                  </h2>
                  <div className="flex justify-center items-center space-x-2 text-sm">
                    <span>+91 {template.orgPhone}</span>
                    <span>•</span>
                    <span>{template.orgEmail}</span>
                  </div>
                </div>

                {/* Bill To and Invoice Info */}
                <div className="grid grid-cols-2 border-b">
                  <div className="p-4 border-r">
                    <div className="mb-3">
                      <div className="font-bold text-sm mb-2">BILL TO</div>
                      <div className="font-bold text-base">
                        {selectedStudent?.name || "[STUDENT NAME]"}
                      </div>
                      <div className="font-semibold">
                        ID: {studentId || "[STUDENT ID]"}
                      </div>
                      <div className="text-sm">
                        Class: {selectedStudent?.class || "[CLASS]"}{" "}
                        {selectedStudent?.section || ""}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="font-bold text-xs">Invoice No.</div>
                          <div className="font-semibold">{invoiceNumber}</div>
                        </div>
                        <div>
                          <div className="font-bold text-xs">Invoice Date</div>
                          <div>{new Date().toLocaleDateString("en-IN")}</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-xs">Due Date</div>
                        <div>
                          {date
                            ? new Date(date).toLocaleDateString("en-IN")
                            : "[ DATE]"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {description && (
                  <div className="px-4 py-2 border-b bg-gray-50">
                    <div className="font-bold text-xs mb-1">DESCRIPTION</div>
                    <div className="text-xs">{description}</div>
                  </div>
                )}

                {/* Items Table */}
                <div className="p-4">
                  <table className="w-full border-collapse border text-xs">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-2 text-left font-bold w-12">
                          S.NO
                        </th>
                        <th className="border px-2 py-2 text-left font-bold">
                          ITEM
                        </th>
                        <th className="border px-2 py-2 text-left font-bold">
                          CATEGORY
                        </th>
                        <th className="border px-2 py-2 text-center font-bold w-16">
                          QTY
                        </th>
                        <th className="border px-2 py-2 text-right font-bold w-20">
                          RATE
                        </th>
                        <th className="border px-2 py-2 text-right font-bold w-24">
                          AMOUNT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.filter((item) => item.category || item.rate)
                        .length > 0 ? (
                        items
                          .filter((item) => item.category || item.rate)
                          .map((item, index) => (
                            <tr key={index}>
                              <td className="border px-2 py-2 text-center">
                                {index + 1}
                              </td>
                              <td className="border px-2 py-2">
                                {item.name || item.category}
                              </td>
                              <td className="border px-2 py-2">
                                {item.category}
                              </td>
                              <td className="border px-2 py-2 text-center">
                                {item.qty || 1}
                              </td>
                              <td className="border px-2 py-2 text-right">
                                ₹
                                {item.rate
                                  ? parseFloat(item.rate).toLocaleString(
                                      "en-IN",
                                      { minimumFractionDigits: 2 }
                                    )
                                  : "0.00"}
                              </td>
                              <td className="border px-2 py-2 text-right font-semibold">
                                ₹
                                {item.amount
                                  ? parseFloat(item.amount).toLocaleString(
                                      "en-IN",
                                      { minimumFractionDigits: 2 }
                                    )
                                  : "0.00"}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td className="border px-2 py-2 text-center">1</td>
                          <td className="border px-2 py-2">[Item Name]</td>
                          <td className="border px-2 py-2">[Category]</td>
                          <td className="border px-2 py-2 text-center">1</td>
                          <td className="border px-2 py-2 text-right">₹0.00</td>
                          <td className="border px-2 py-2 text-right font-semibold">
                            ₹0.00
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="px-4 pb-4">
                  <div className="border-t pt-2">
                    <div className="flex justify-end">
                      <div className="w-64">
                        <div
                          className="flex justify-between p-3 rounded font-bold text-white"
                          style={{ backgroundColor: template.themeColor }}
                        >
                          <span>TOTAL AMOUNT</span>
                          <span>₹ {formatCurrencyPlain(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount in Words */}
                <div className="px-4 pb-4">
                  <div className="border rounded p-3 bg-gray-50">
                    <div className="text-xs">
                      <span className="font-bold">
                        Total Amount (in words):
                      </span>
                      <div className="mt-1 font-semibold capitalize">
                        {totalInWords} Rupees Only
                      </div>
                    </div>
                  </div>
                </div>

                {/* Barcode */}
                <div className="text-center text-lg bg-white px-3 py-4 font-mono">
                  {generateBarcode()}
                </div>

                {/* Footer */}
                <div className="text-center p-4 border-t text-xs text-gray-600">
                  <p>Thank you for your payment!</p>
                  <p className="mt-1">This is a computer generated bill.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ManageCategories
        isOpen={isCategoryModalOpen}
        setIsOpen={setIsCategoryModalOpen}
      />
    </div>
  );
};

export default SuperCreateBill;
