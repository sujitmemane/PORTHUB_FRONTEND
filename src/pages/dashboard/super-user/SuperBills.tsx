import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuperBills = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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
  return (
    <div>
      <div className="flex items-center justify-between w-full mb-4">
        {/* Left side */}
        <div className="flex items-center">{SearchInput}</div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/dashboard/super-user/bills/create")}
          >
            <Plus className="mr-2" size={16} /> Add Bill
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuperBills;
