import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Papa from "papaparse";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CLASSES } from "../constants";
import { studentService } from "../services";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

const AddBulkStudents = ({
  showBulkStudents,
  setShowBulkStudents,
  onSuccess,
}: {
  showBulkStudents: boolean;
  setShowBulkStudents: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => {};
}) => {
  const fileRef = useRef(null);
  const { user } = useAuth();
  const [csvPreview, setCsvPreview] = useState([]);
  const [csvErrors, setCsvErrors] = useState([]);
  const [invalidRows, setInvalidRows] = useState([]);

  const handleFilePick = (file) => {
    try {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setCsvPreview(results.data);
          setCsvErrors([]);
          setInvalidRows([]);
        },
        error: function (err) {
          console.error("CSV Parse Error:", err);
          setCsvErrors([{ row: "N/A", message: "Failed to parse CSV" }]);
        },
      });
    } catch (err) {
      console.error("Error reading CSV:", err);
      setCsvErrors([{ row: "N/A", message: "Invalid CSV file" }]);
    }
  };

  const handleBulkSave = async () => {
    if (csvPreview.length === 0) {
      alert("No rows to save");
      return;
    }

    const errors = [];
    const invalids = [];

    csvPreview.forEach((row, i) => {
      const rowNum = i + 1;

      if (!row.name || row.name.trim() === "") {
        errors.push({ row: rowNum, message: "Missing student name" });
        invalids.push(rowNum);
      }

      if (!row.class || !CLASSES.includes(row.class.trim())) {
        errors.push({
          row: rowNum,
          message: `Invalid or missing class (Allowed: ${CLASSES.join(", ")})`,
        });
        invalids.push(rowNum);
      }

      if (!row.studentId || row.studentId.trim() === "") {
        errors.push({ row: rowNum, message: "Missing student ID" });
        invalids.push(rowNum);
      }
    });

    setCsvErrors(errors);
    setInvalidRows([...new Set(invalids)]);

    if (errors.length === 0) {
      console.log("Saving students:", csvPreview);
      const response = await studentService.addBulkStudent(
        user?.organization,
        csvPreview
      );

      toast(response?.message || "Student added successfully");
    }
  };

  return (
    <Dialog open={showBulkStudents} onOpenChange={setShowBulkStudents}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Bulk Upload Students
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* File Input */}
          <div>
            <Label className="block mb-2 font-medium text-gray-700">
              Upload CSV
            </Label>
            <div className="flex items-center gap-3">
              <input
                ref={fileRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && handleFilePick(e.target.files[0])
                }
              />
              <Button
                variant="outline"
                onClick={() => fileRef.current?.click()}
              >
                Browse File
              </Button>
              {fileRef.current?.files?.[0] && (
                <span className="text-sm text-gray-600">
                  {fileRef.current.files[0].name}
                </span>
              )}
            </div>
          </div>

          {/* CSV Preview */}
          {csvPreview.length > 0 && (
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50 font-medium text-gray-700">
                Preview
              </div>
              <div className="overflow-auto max-h-64">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">SNo.</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-left">Student ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvPreview.map((r, idx) => {
                      const rowNum = idx + 1;
                      const isInvalid = invalidRows.includes(rowNum);

                      return (
                        <tr
                          key={idx}
                          className={`${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } ${isInvalid ? "bg-red-50" : ""}`}
                        >
                          <td className="p-2">{rowNum}</td>
                          <td className="p-2">{r.name}</td>
                          <td className="p-2">{r.class}</td>
                          <td className="p-2 font-mono">{r.studentId}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Errors */}
          {csvErrors.length > 0 && (
            <div className="bg-red-50 border border-red-300 text-red-800 rounded-md p-3 text-sm">
              <strong className="block mb-1">Errors:</strong>
              <ul className="list-disc ml-5 space-y-1">
                {csvErrors.map((e, i) => (
                  <li key={i}>
                    Row {e.row}: {e.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                setShowBulkStudents(false);
                setCsvPreview([]);
                setCsvErrors([]);
                setInvalidRows([]);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleBulkSave} disabled={csvPreview.length === 0}>
              Confirm Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBulkStudents;
