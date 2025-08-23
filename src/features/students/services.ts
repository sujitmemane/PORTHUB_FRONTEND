import ApiClient from "@/lib/axios.ts";
import axios from "axios";

interface StudentFormValues {
  name: string;
  class: string;
  studentId: string;
  organization: string;
}

interface StudentBulkFormValues {
  name: string;
  class: string;
  studentId: string;
}

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const studentService = {
  async addStudent(data: StudentFormValues) {
    try {
      const res = await ApiClient.post(`${API_BASE}/students`, data);
      return res.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add student";
      throw new Error(message);
    }
  },

  async addBulkStudent(organization: string, data: StudentFormValues[]) {
    try {
      const res = await ApiClient.post(`${API_BASE}/students/bulk`, {
        organization,
        students: data,
      });
      return res.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add student";
      throw new Error(message);
    }
  },
  async getStudents(
    organization: string,
    query: string,
    filterClass: string,
    filterSection: string,
    page: number
  ) {
    const res = await ApiClient.get(
      `${API_BASE}/students/organizations/${organization}?query=${query}&class=${filterClass}&section=${filterSection}&page=${page}`
    );
    return res.data;
  },

  async getStudentById(id: string) {
    const res = await axios.get(`${API_BASE}/students/${id}`);
    return res.data;
  },

  async deleteStudent(id: string) {
    const res = await axios.delete(`${API_BASE}/students/${id}`);
    return res.data;
  },
};
