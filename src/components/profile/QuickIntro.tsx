import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EnhanceAI from "../common/EnhanceAI";

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
  const [searches, setSearches] = useState<string[]>(items.map(() => ""));

  const handleIconChange = (idx: number, iconName: string) => {
    const newItems = [...items];
    newItems[idx].icon = iconName;
    setItems(newItems);

    const newSearches = [...searches];
    newSearches[idx] = "";
    setSearches(newSearches);
  };

  const handleTextChange = (idx: number, value: string) => {
    const newItems = [...items];
    newItems[idx].text = value;
    setItems(newItems);
  };

  const handleSearchChange = (idx: number, value: string) => {
    const newSearches = [...searches];
    newSearches[idx] = value;
    setSearches(newSearches);
  };

  const addNewItem = () => {
    setItems([...items, { icon: "User", text: "" }]);
    setSearches([...searches, ""]);
  };

  const deleteItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
    setSearches(searches.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-2 my-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Quick Intros</h1>
        <Button
          onClick={addNewItem}
          className="flex items-center gap-1 text-sm px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#2A2A2A] "
        >
          + Add New Intro
        </Button>
      </div>

      <div className="flex flex-col  w-full border border-gray-700 bg-[#1A1A1A] rounded-xl">
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
                    className="w-10 h-10 p-0  border border-[#2A2A2A] flex items-center justify-center rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] "
                  >
                    <Icon className="w-5 h-5 text-white  " />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-3 w-80 bg-[#0F0F0F] border border-gray-700 rounded-xl">
                  <Input
                    placeholder="Search icon..."
                    value={searches[idx]}
                    onChange={(e) => handleSearchChange(idx, e.target.value)}
                    className="mb-3 bg-[#111111] border border-[#2A2A2A] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFCC00]"
                  />
                  <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto">
                    {popularIcons
                      .filter((name) =>
                        name.toLowerCase().includes(searches[idx].toLowerCase())
                      )
                      .map((name) => {
                        const OptionIcon =
                          LucideIcons[name as keyof typeof LucideIcons];
                        return (
                          <button
                            key={name}
                            onClick={() => handleIconChange(idx, name)}
                            className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-[#1A1A1A] transition transform hover:scale-110"
                          >
                            <OptionIcon className="w-6 h-6 text-gray-300" />
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
                className="w-full px-3 py-2 bg-[#111111] border border-[#2A2A2A]  rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent transition-all"
              />

              {/* Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <LucideIcons.Settings className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {/* Enhance nested dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <DropdownMenuItem
                        onClick={() => {}}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <LucideIcons.Feather />
                        Enhance
                      </DropdownMenuItem>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2 w-64">
                      <EnhanceAI />
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Delete item */}
                  <DropdownMenuItem
                    onClick={() => deleteItem(idx)}
                    className="flex items-center gap-2"
                  >
                    <LucideIcons.Delete />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickInfo;
