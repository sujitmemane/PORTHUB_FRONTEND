import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const quickSuggestions = [
  { title: "Impact", description: "Add metrics and outcomes" },
  { title: "Rephrase", description: "Rewrite in a clearer way" },
  { title: "Expand", description: "Add more detail and context" },
  { title: "Condense", description: "Make the bullet point more concise" },
];

export default function EnhanceAI() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full bg-[#1A1A1A] p-4 rounded-xl shadow-lg">
      <h2 className="text-purple-600 font-bold text-lg mb-4">
        Enhance with AI
      </h2>

      {/* Input section */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Type here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-purple-600 focus:ring-purple-500"
        />
        <Button variant="outline" className="p-2">
          <ArrowRight className="w-4 h-4 text-purple-600" />
        </Button>
      </div>

      {/* Suggestions */}
      <div className="space-y-2">
        {quickSuggestions.map((item) => (
          <Button
            key={item.title}
            variant="secondary"
            className="justify-start bg-gray-100 text-black hover:bg-gray-200 flex flex-col p-3 rounded-lg shadow-sm w-full"
          >
            <span className="font-semibold">{item.title}</span>
            <span className="text-sm text-gray-600">{item.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
