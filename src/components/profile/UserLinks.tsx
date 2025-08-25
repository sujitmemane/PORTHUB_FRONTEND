import React, { useState } from "react";
import { ArrowUpRight, Edit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddEditLink from "./AddEditLink";

const initialLinks = [
  {
    name: "LinkedIn",
    username: "ncdai",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    url: "https://www.linkedin.com/in/ncdai",
  },
  {
    name: "GitHub",
    username: "ncdai",
    icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    url: "https://github.com/ncdai",
  },
  {
    name: "X",
    username: "@iamncdai",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    url: "https://x.com/iamncdai",
  },
];

const UserLinks = () => {
  const [links, setLinks] = useState(initialLinks);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    username: "",
    url: "",
    icon: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (editingIndex !== null) {
      const updatedLinks = [...links];
      updatedLinks[editingIndex] = form;
      setLinks(updatedLinks);
    } else {
      setLinks([...links, form]);
    }
    setForm({ name: "", username: "", url: "", icon: "" });
    setEditingIndex(null);
    setOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(links[index]);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingIndex(null);
    setForm({ name: "", username: "", url: "", icon: "" });
    setOpen(true);
  };

  return (
    <div className="p-2 my-8">
      <div className="flex justify-between  items-center mb-4 ">
        <h1 className="text-lg font-bold">User Links</h1>
        <Button
          onClick={handleAdd}
          variant="default"
          className="flex items-center gap-1 text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A] "
        >
          <Plus className="w-4 h-4" /> Add New Link
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4  bg-[#1A1A1A] border border-gray-700 rounded-xl">
        {links.map((link, index) => (
          <div
            key={link.name}
            className="flex items-center justify-between p-4 border border-[#2A2A2A]  rounded-lg hover:bg-[#0A0A0A] transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={link.icon}
                alt={link.name}
                className="w-10 h-10 rounded-md"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-white">{link.name}</span>
                <span className="text-gray-400 text-sm">{link.username}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(index)}
              >
                <Edit className="w-5 h-5 text-white" />
              </Button>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog for Add/Edit */}
      <AddEditLink open={open} setOpen={setOpen} id={3} />
    </div>
  );
};

export default UserLinks;
