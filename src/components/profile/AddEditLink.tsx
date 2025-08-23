import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApiClient from "@/lib/axios";

const AddEditLink = ({ open, setOpen, id }) => {
  const [form, setForm] = useState({
    type: "",
    name: "",
    url: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);
  const [linkTypes, setLinkTypes] = useState([]);

  const fetchLinks = async () => {
    try {
      const res = await ApiClient.get("/links");
      if (res?.data?.success) setLinkTypes(res.data.data);
    } catch (error) {
      console.error("Failed to fetch links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSelectType = (type) => {
    const selected = linkTypes.find((link) => link.type === type);
    if (selected) {
      setForm({
        ...form,
        type: selected.type,
        name: selected.name,
        icon: selected.logo,
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (id) await ApiClient.put(`/links/${id}`, form);
      else await ApiClient.post("/links", form);
      setOpen(false);
    } catch (error) {
      console.error("Failed to save link:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#0A0A0A] text-white rounded-xl border border-[#1A1A1A] shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {id ? "Edit Link" : "Add New Link"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Shadcn Select for Type */}
          <Select value={form.type} onValueChange={handleSelectType}>
            <SelectTrigger className="bg-[#111111] w-full border border-[#2A2A2A] text-white rounded-lg">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] text-white border border-[#2A2A2A] rounded-lg">
              {linkTypes.map((link) => (
                <SelectItem
                  key={link._id}
                  value={link.type}
                  className="flex items-center space-x-2 hover:bg-[#222222] rounded-md"
                >
                  <img src={link.logo} alt={link.name} className="w-5 h-5" />
                  <span>{link.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name="url"
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#111111] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all"
          />
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-yellow-500 text-black hover:bg-yellow-400 rounded-lg px-6 py-2"
          >
            {loading ? "Saving..." : id ? "Save Changes" : "Add Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditLink;
