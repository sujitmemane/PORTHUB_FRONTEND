import { z } from "zod";
import { CLASSES, SECTIONS } from "./constants";

export const studentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),

  class: z.enum(CLASSES, { required_error: "Class is required" }).optional(),

  studentId: z
    .string()
    .min(2, { message: "Student ID must be at least 2 characters" }),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
