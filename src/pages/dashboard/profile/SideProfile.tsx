import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

type Category = {
  name: string;
  skills: string[];
};

const SideProfile: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      name: "Tech",
      skills: [
        "React",
        "Next.js",
        "Typescript",
        "Python",
        "Pytorch",
        "Postgres",
        "C++",
      ],
    },
    { name: "Extra", skills: ["Communication", "Shitposting"] },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState<{ [key: number]: string }>({});

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, { name: newCategory.trim(), skills: [] }]);
    setNewCategory("");
  };

  const deleteCategory = (categoryIndex: number) => {
    setCategories(categories.filter((_, idx) => idx !== categoryIndex));
  };

  const addSkill = (categoryIndex: number) => {
    const skill = newSkill[categoryIndex];
    if (!skill?.trim()) return;
    const updated = [...categories];
    updated[categoryIndex].skills.push(skill.trim());
    setCategories(updated);
    setNewSkill({ ...newSkill, [categoryIndex]: "" });
  };

  const deleteSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...categories];
    updated[categoryIndex].skills = updated[categoryIndex].skills.filter(
      (_, i) => i !== skillIndex
    );
    setCategories(updated);
  };

  return (
    <div className="w-full border-white/10 text-white">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Skills</h2>
        <Button
          variant="default"
          className="flex items-center gap-1 text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A] "
          onClick={addCategory}
        >
          <Plus className="w-3 h-3" /> Add Category
        </Button>
      </div>

      {categories.map((category, idx) => (
        <div key={idx} className="mb-6">
          {/* Category header with delete button */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">
              {category.name}
            </h3>
            <button
              onClick={() => deleteCategory(idx)}
              className="text-[#FF7F7F]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Skills list */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-[#1A1A1A] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
              >
                {skill}
                <button
                  onClick={() => deleteSkill(idx, i)}
                  className="text-[#FF7F7F]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Add skill input */}
          <div className="flex gap-2 mt-3">
            <Input
              type="text"
              placeholder="Add skill"
              value={newSkill[idx] || ""}
              onChange={(e) =>
                setNewSkill({ ...newSkill, [idx]: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#111111] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
            />

            <Button
              variant="default"
              className="flex items-center gap-1 text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A] "
              onClick={() => addSkill(idx)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideProfile;
