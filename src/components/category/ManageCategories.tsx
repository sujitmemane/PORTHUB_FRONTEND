import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import ApiClient from "@/lib/axios";
import { useEffect, useState } from "react";

const ManageCategories = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async (orgId: string) => {
    try {
      const response = await ApiClient.get(
        `/categories/organizations/${orgId}`
      );
      if (response?.data?.success) {
        setCategories(response?.data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    if (user?.organization) {
      fetchCategories(user.organization);
    }
  }, [user]);

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;

    try {
      const response = await ApiClient.post(`/categories`, {
        name: newCategory.name,
        description: newCategory.description,
        organization: user?.organization,
      });

      if (response?.data?.success) {
        fetchCategories(user?.organization!);
      }
    } catch (error) {
      console.error("Failed to add category:", error);
    }

    setNewCategory({ name: "", description: "" });
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description || "",
    });
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !newCategory.name.trim()) return;

    try {
      const response = await ApiClient.put(`/categories/update`, {
        id: editingCategory._id,
        name: newCategory.name,
        description: newCategory.description,
      });

      if (response?.data?.success) {
        fetchCategories(user?.organization);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
    }

    setEditingCategory(null);
    setNewCategory({ name: "", description: "" });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await ApiClient.post(`/categories/delete`, {
        id: categoryId,
      });
      if (response?.data?.success) {
        fetchCategories(user?.organization);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add/Edit Category Form */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category Name</Label>
                <Input
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  placeholder="Enter description"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={
                  editingCategory ? handleUpdateCategory : handleAddCategory
                }
                disabled={!newCategory.name.trim()}
              >
                {editingCategory ? "Update" : "Add"} Category
              </Button>
              {editingCategory && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingCategory(null);
                    setNewCategory({ name: "", description: "" });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>

          {/* Categories List */}
          <div>
            <h3 className="font-semibold mb-4">Existing Categories</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="rounded-xl border bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
                >
                  {/* Top: Name + Description + Actions */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid sm:grid-cols-3 gap-2 text-xs text-gray-500">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">
                        Created By
                      </span>
                      <span>
                        {category.createdBy?.name} <br />
                        <span className="text-gray-400">
                          {category.createdBy?.email}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Created At
                      </span>
                      <div className="bg-gray-100 px-2 py-1 rounded-md w-fit mt-1">
                        {new Date(category.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Updated At
                      </span>
                      <div className="bg-gray-100 px-2 py-1 rounded-md w-fit mt-1">
                        {new Date(category.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCategories;
