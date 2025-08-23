import React, { useState } from "react";
import * as LucideIcons from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ 100 most useful Lucide icons for portfolio-style apps
const popularIcons = [
  "User",
  "Users",
  "Briefcase",
  "GraduationCap",
  "BookOpen",
  "Rocket",
  "Code",
  "Terminal",
  "Laptop",
  "Cpu",
  "Database",
  "Cloud",
  "Globe",
  "Mail",
  "Phone",
  "MessageCircle",
  "Linkedin",
  "Github",
  "Twitter",
  "Instagram",
  "Facebook",
  "Globe2",
  "Link",
  "MapPin",
  "Compass",
  "Award",
  "Star",
  "Heart",
  "Camera",
  "Image",
  "Music",
  "Film",
  "Mic",
  "PenTool",
  "Edit3",
  "FileText",
  "Folder",
  "Calendar",
  "Clock",
  "AlarmClock",
  "Settings",
  "Wrench",
  "Hammer",
  "Monitor",
  "Smartphone",
  "Tablet",
  "Keyboard",
  "Mouse",
  "Search",
  "Eye",
  "Download",
  "Upload",
  "Share",
  "Send",
  "Zap",
  "Sun",
  "Moon",
  "Bell",
  "Check",
  "X",
  "Plus",
  "Minus",
  "ChevronDown",
  "ChevronUp",
  "ChevronLeft",
  "ChevronRight",
  "ArrowRight",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "ExternalLink",
  "Home",
  "House",
  "Building",
  "Factory",
  "Glasses",
  "Wallet",
  "CreditCard",
  "ShoppingBag",
  "ShoppingCart",
  "TrendingUp",
  "TrendingDown",
  "ChartBar",
  "PieChart",
  "BarChart",
  "Activity",
  "Server",
  "Battery",
  "Lightbulb",
  "Clipboard",
  "Map",
  "Package",
  "Truck",
  "Plane",
  "Book",
  "Newspaper",
  "Handshake",
];

const QuickInfo = () => {
  const [items, setItems] = useState([
    { icon: "Mail", text: "sujit@example.com" },
    { icon: "Phone", text: "+91 9876543210" },
    { icon: "Globe", text: "sujit.dev" },
  ]);

  const handleIconChange = (idx: number, iconName: string) => {
    const newItems = [...items];
    newItems[idx].icon = iconName;
    setItems(newItems);
  };

  const handleTextChange = (idx: number, value: string) => {
    const newItems = [...items];
    newItems[idx].text = value;
    setItems(newItems);
  };

  const addNewItem = () => {
    setItems([...items, { icon: "User", text: "" }]);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Quick Intros</h1>

      <div className="flex flex-col gap-4 p-6 w-full bg-[#0F0F0F] border border-gray-800 rounded-xl shadow-md">
        {items.map((item, idx) => {
          const Icon =
            LucideIcons[item.icon as keyof typeof LucideIcons] ||
            LucideIcons.Circle;

          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1A1A1A] transition"
            >
              {/* Icon picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-10 h-10 p-0 flex items-center justify-center rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-gray-700"
                  >
                    <Icon className="w-5 h-5 text-gray-300" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-3 w-72 bg-[#0F0F0F] border border-gray-700 rounded-xl">
                  <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto">
                    {popularIcons.map((name) => {
                      const OptionIcon =
                        LucideIcons[name as keyof typeof LucideIcons];
                      return (
                        <button
                          key={name}
                          onClick={() => handleIconChange(idx, name)}
                          className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-[#1A1A1A] transition"
                        >
                          <OptionIcon className="w-5 h-5 text-gray-300" />
                          <span className="text-[10px] text-gray-400 mt-1 truncate">
                            {name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Editable text */}
              <Input
                value={item.text}
                onChange={(e) => handleTextChange(idx, e.target.value)}
                placeholder="Enter text..."
                className="w-full px-3 py-2 bg-[#111111] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all"
              />
            </div>
          );
        })}

        {/* Add new intro button */}
        <Button
          onClick={addNewItem}
          className="mt-2 bg-[#1A1A1A] text-gray-300 border border-gray-700 hover:bg-[#2A2A2A] rounded-lg"
        >
          + Add New Intro
        </Button>
      </div>
    </div>
  );
};

export default QuickInfo;
