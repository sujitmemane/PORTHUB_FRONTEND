import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ApiClient from "@/lib/axios";
import { Plus, X, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Category = {
  _id: string;
  name: string;
  skills: { _id: string; name: string }[];
};

const SideProfile: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryInput, setCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState<{ [key: string]: string }>({});

  // Loading states
  const [addCategoryLoading, setAddCategoryLoading] = useState(false);
  const [deleteCategoryLoading, setDeleteCategoryLoading] = useState<
    string | null
  >(null);
  const [addSkillLoading, setAddSkillLoading] = useState<string | null>(null);
  const [deleteSkillLoading, setDeleteSkillLoading] = useState<string | null>(
    null
  );

  const fetchSkills = async () => {
    try {
      const res = await ApiClient.get("/skills");
      if (res?.data?.success) setCategories(res.data.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim())
      return toast.error("Category name cannot be empty");
    setAddCategoryLoading(true);
    try {
      const res = await ApiClient.post("/skills/categories", {
        name: newCategory,
      });
      if (res?.data?.success) {
        fetchSkills();
        toast.success(res?.data?.message || "Category added");
        setNewCategory("");
        setCategoryInput(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error adding category");
    } finally {
      setAddCategoryLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setDeleteCategoryLoading(categoryId);
    try {
      const res = await ApiClient.delete("/skills/categories", {
        data: { categoryId },
      });
      if (res?.data?.success) {
        fetchSkills();
        toast.success(res?.data?.message || "Category deleted");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error deleting category");
    } finally {
      setDeleteCategoryLoading(null);
    }
  };

  const handleAddSkill = async (categoryId: string, name: string) => {
    if (!name.trim()) return toast.error("Skill name cannot be empty");
    setAddSkillLoading(categoryId);
    try {
      const res = await ApiClient.post("/skills/categories/skills", {
        categoryId,
        name,
      });
      if (res?.data?.success) {
        fetchSkills();
        setNewSkill((prev) => ({ ...prev, [categoryId]: "" }));
        toast.success(res?.data?.message || "Skill added");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error adding skill");
    } finally {
      setAddSkillLoading(null);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    setDeleteSkillLoading(skillId);
    try {
      const res = await ApiClient.delete("/skills/categories/skills", {
        data: { skillId },
      });
      if (res?.data?.success) {
        fetchSkills();
        toast.success(res?.data?.message || "Skill deleted");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error deleting skill");
    } finally {
      setDeleteSkillLoading(null);
    }
  };

  return (
    <div className="w-full border-white/10 text-white">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Skills</h2>
        <Button
          variant="default"
          className="flex items-center gap-1 text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A]"
          onClick={() => setCategoryInput(true)}
          disabled={addCategoryLoading}
        >
          {addCategoryLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-3 h-3" />
          )}{" "}
          Add Category
        </Button>
      </div>

      {categoryInput && (
        <div className="mb-4 flex gap-2">
          <Input
            type="text"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-4 py-2 bg-[#111111] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
          />
          <Button
            onClick={handleAddCategory}
            disabled={addCategoryLoading}
            className="flex items-center gap-1 text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A]"
          >
            {addCategoryLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-3 h-3" />
            )}
          </Button>
          <Button
            onClick={() => setCategoryInput(false)}
            className="flex items-center gap-1 text-[#FF7F7F] text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A]"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {categories.map((category) => (
        <div key={category._id} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{category?.name}</h3>
            <button
              onClick={() => handleDeleteCategory(category._id)}
              disabled={deleteCategoryLoading === category._id}
              className="flex items-center gap-1 text-[#FF7F7F] text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A]"
            >
              {deleteCategoryLoading === category._id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill._id}
                className="bg-[#1A1A1A] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
              >
                {skill.name}
                <button
                  onClick={() => handleDeleteSkill(skill._id)}
                  disabled={deleteSkillLoading === skill._id}
                  className="text-[#FF7F7F]"
                >
                  {deleteSkillLoading === skill._id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <X className="w-3 h-3" />
                  )}
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <Input
              type="text"
              placeholder="Add skill"
              value={newSkill[category._id] || ""}
              onChange={(e) =>
                setNewSkill({ ...newSkill, [category._id]: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#111111] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
            />
            <Button
              variant="default"
              onClick={() =>
                handleAddSkill(category._id, newSkill[category._id])
              }
              disabled={addSkillLoading === category._id}
              className="flex items-center gap-1 text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A]"
            >
              {addSkillLoading === category._id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideProfile;
