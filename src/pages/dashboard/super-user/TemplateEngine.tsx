import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ApiClient from "@/lib/axios";
import { toast } from "sonner";

const TemplateSchema = z.object({
  orgName: z.string().min(1, "Organization name is required"),
  orgPlace: z.string().min(1, "Organization place is required"),
  orgPhone: z
    .string()
    .regex(/^[+]?[\d\s\-()]{10,}$/, "Invalid phone number format"),
  orgEmail: z.string().email("Invalid email format"),
  themeColor: z.string().min(1, "Please select a theme color"),
});

const colorThemes = [
  { id: "blue", name: "Blue", primary: "#3B82F6", secondary: "#DBEAFE" },
  { id: "orange", name: "Orange", primary: "#F97316", secondary: "#FED7AA" },
  { id: "green", name: "Green", primary: "#10B981", secondary: "#D1FAE5" },
  { id: "purple", name: "Purple", primary: "#8B5CF6", secondary: "#E9D5FF" },
  { id: "red", name: "Red", primary: "#EF4444", secondary: "#FECACA" },
  { id: "teal", name: "Teal", primary: "#14B8A6", secondary: "#CCFBF1" },
];

const TemplateEngine: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(TemplateSchema),
    defaultValues: {
      orgName: "Business Name",
      orgPlace: "New Delhi, DELHI, 110001",
      orgPhone: "8624800390",
      orgEmail: "business@email.com",
    },
  });

  const fetchData = async () => {
    try {
      const response = await ApiClient.get("/organizations/template");

      if (response?.data?.data) {
        form.reset({
          orgName: response.data.data.orgName || "",
          orgPlace: response.data.data.orgPlace || "",
          orgPhone: response.data.data.orgPhone || "",
          orgEmail: response.data.data.orgEmail || "",
          themeColor: response?.data?.data?.orgTheme || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch template:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { watch } = form;
  const formData = watch();
  const selectedTheme =
    colorThemes.find((theme) => theme.id === formData.themeColor) ||
    colorThemes[1];

  const formatCurrencyPlain = (amount: number): string => {
    return amount.toLocaleString("en-IN");
  };

  const numberToWords = (num: number): string => {
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
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
      );
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

    return "Amount too large";
  };

  const generateBarcode = (): string => {
    return "|||||| || ||| || |||| | ||| |||| || ||| | |||| ||";
  };

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await ApiClient.put("/organizations/template/update", {
        orgName: data?.orgName,
        orgPhone: data?.orgPhone,
        orgEmail: data?.orgEmail,
        orgPlace: data?.orgPlace,
        orgTheme: data?.themeColor,
      });
      if (response?.data?.success) {
        toast(response?.data?.message);
      } else {
        toast(response?.data?.message);
      }
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className=" border-0 bg-white/90 backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                  <CardContent className="p-6 space-y-6 max-h-[800px] overflow-y-auto">
                    {/* Theme Selection */}

                    {/* Organization Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Organization Details
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="orgName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Business Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="orgPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile</FormLabel>
                              <FormControl>
                                <Input placeholder="8624800390" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="orgPlace"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Full Address with Pin Code"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="orgEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="business@email.com"
                                  type="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                        Theme Color
                      </h3>
                      <FormField
                        control={form.control}
                        name="themeColor"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex gap-2">
                              {colorThemes.map((theme) => (
                                <div
                                  key={theme.id}
                                  style={{ backgroundColor: theme.primary }}
                                  className={`p-3 border-2 w-5 h-5 rounded-full  cursor-pointer transition-all ${
                                    field.value === theme.id
                                      ? "border-gray-800 shadow-md"
                                      : "border-gray-200 hover:border-gray-400"
                                  }`}
                                  onClick={() => field.onChange(theme.id)}
                                ></div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Notes and Terms */}

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        className="cursor-pointer text-white flex-1"
                      >
                        Save Template
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </form>
            </Form>
          </Card>

          {/* Professional Bill Preview */}
          <Card className=" border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="bg-white border m-4 print:m-0 print:shadow-none print:border-black text-xs">
                {/* Business Info */}
                <div className="text-center py-6 border-b">
                  <h1
                    className="text-xl font-bold "
                    style={{ color: selectedTheme.primary }}
                  >
                    {formData.orgName || "[Business Name]"}
                  </h1>
                  <h2 className="text-sm font-semibold">
                    {formData.orgPlace || "[Business Place]"}
                  </h2>
                  <div className="flex justify-center space-x-2">
                    <p className="text-sm mb-1">
                      +91 {formData.orgPhone || "[Phone Number]"}
                    </p>
                    <span>.</span>
                    <p className="text-sm mb-1">
                      {formData.orgEmail || "[Business Email]"}
                    </p>
                  </div>
                </div>

                {/* Bill To and Invoice Info */}
                <div className="grid grid-cols-2 border-b">
                  <div className="p-4 border-r">
                    <div className="mb-3">
                      <div className="font-bold text-sm mb-2">BILL TO</div>
                      <div className="font-bold">[STUDENT NAME]</div>{" "}
                      <div className="font-bold">[STUDENT ADM ID]</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="font-bold">Invoice No.</div>
                        <div>{"BILL001"}</div>
                      </div>
                      <div>
                        <div className="font-bold">Invoice Date</div>
                        <div>[DATE]</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="p-4">
                  <table className="w-full border-collapse border text-xs">
                    <thead>
                      <tr className="bg-gray-100">
                        {[
                          "S.NO",
                          "ITEM",
                          "CATEGORY",
                          "QTY.",
                          "RATE",
                          "AMOUNT",
                        ]?.map((item, idx) => (
                          <th
                            key={idx}
                            className="border px-2 py-2 text-left font-bold"
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {" "}
                        <td className="border px-2 py-2">1</td>
                        <td className="border px-2 py-2">School Fees</td>
                        <td className="border px-2 py-2">Fees</td>
                        <td className="border px-2 py-2">1</td>
                        <td className="border px-2 py-2">1</td>
                        <td className="border px-2 py-2">1000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="px-4 pb-4">
                  <div className="border-t pt-2">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div></div>
                      <div className="space-y-1">
                        <div
                          className="flex justify-between p-1 rounded font-bold"
                          style={{
                            backgroundColor: selectedTheme.secondary,
                            color: selectedTheme.primary,
                          }}
                        >
                          <span>TOTAL AMOUNT</span>
                          <span>₹ {formatCurrencyPlain(1000)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount in Words */}
                <div className="px-4">
                  <div className="border rounded p-2 bg-gray-50">
                    <div className="text-xs">
                      <span className="font-bold">Total Amount (in words)</span>
                      <div className="mt-1">Three Hundred Rupees</div>
                    </div>
                  </div>
                </div>

                <div className=" text-center text-lg bg-white px-3 py-4">
                  {generateBarcode()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplateEngine;
