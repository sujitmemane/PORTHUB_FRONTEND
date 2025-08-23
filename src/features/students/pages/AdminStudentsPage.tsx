import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Upload,
  Plus,
  Search,
  UserPlus,
  FileText,
  Filter,
} from "lucide-react";

// shadcn/ui components (adjust imports to match your project structure)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import AddStudent from "../components/AddStudent";
import AddBulkStudents from "../components/AddBulkStudents";
import { studentService } from "../services";
import useAuth from "@/hooks/useAuth";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CLASSES, SECTIONS } from "../constants";
import { useDebounce } from "@/hooks/useDebounce";

export default function AdminStudentsPage() {
  const { user } = useAuth();
  // data
  const [students, setStudents] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState();

  // UI state
  const [query, setQuery] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  // modals
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);

  const SearchInput = (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Search by name or student ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="min-w-[260px]"
      />
    </div>
  );
  console.log(user?.organization, "das");
  const fetchStudents = async () => {
    try {
      const response = await studentService.getStudents(
        user?.organization,
        query,
        filterClass,
        filterSection,
        currentPage
      );

      setStudents(response?.data?.students);
      setPagination(response?.data?.pagination);
    } catch (error) {}
  };
  useEffect(() => {
    if (user?.organization) {
      fetchStudents();
    }
  }, [user, debouncedQuery, filterClass, filterSection, currentPage]);
  console.log(students);
  return (
    <div className="">
      {/* Topbar */}
      <div className="flex items-center justify-between w-full mb-4">
        {/* Left side */}
        <div className="flex items-center">{SearchInput}</div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAdd(true)}>
            <Plus className="mr-2" size={16} /> Add Student
          </Button>

          <Button onClick={() => setShowBulk(true)} variant="outline">
            <Upload className="mr-2" size={16} /> Bulk Upload
          </Button>

          <Button variant="ghost">
            <Download className="mr-2" size={16} /> Export
          </Button>
        </div>
      </div>

      {/* Filters and summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col space-y-2">
              <Label>Class</Label>
              <Select onValueChange={(v) => setFilterClass(v)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {CLASSES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Section</Label>
              <Select onValueChange={(v) => setFilterSection(v)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {SECTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students table */}
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead className="">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Class</th>
                  <th className="p-3 text-left">Section</th>

                  <th className="p-3 text-left">Student ID</th>

                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((s) => (
                  <motion.tr
                    key={s.id}
                    whileHover={{ scale: 1.01 }}
                    className="border-b"
                  >
                    <td className="p-3">{s?.name}</td>
                    <td className="p-3">{s?.class}</td>
                    <td className="p-3">{s?.section}</td>

                    <td className="p-3 font-mono">{s?.studentId}</td>

                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm">View</Button>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {students?.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-6 text-center text-muted-foreground"
                    >
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            {[...Array(pagination?.totalPages)].map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((p) => Math.min(pagination?.totalPages, p + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>

      <AddStudent
        showAddStudent={showAdd}
        setShowAddStudent={setShowAdd}
        onSuccess={fetchStudents}
      />
      <AddBulkStudents
        showBulkStudents={showBulk}
        onSuccess={fetchStudents}
        setShowBulkStudents={setShowBulk}
      />
    </div>
  );
}
