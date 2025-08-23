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
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CLASSES, SECTIONS } from "../constants";
import { studentSchema, type StudentFormValues } from "../schemas";
import { studentService } from "../services";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

const AddStudent = ({
  showAddStudent,
  setShowAddStudent,
  onSuccess,
}: {
  showAddStudent: boolean;
  setShowAddStudent: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => {};
}) => {
  const { user } = useAuth();
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      studentId: "",
      class: "",
    },
  });

  const formField = form.watch();
  console.log(formField);
  console.log("add", user);
  const handleAddStudent = async (values: StudentFormValues) => {
    try {
      const response = await studentService.addStudent({
        ...values,
        organization: user?.organization,
      });
      toast(response?.message || "Student added successfully");
      onSuccess();
      setShowAddStudent(false);
    } catch (error: any) {
      toast(error.message);
    }
    console.log("Submitted", values);
  };

  return (
    <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddStudent)}
            className="grid gap-4"
          >
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CLASSES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowAddStudent(false)}
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudent;
