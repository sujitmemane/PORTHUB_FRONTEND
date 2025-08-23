import Logo from "../common/Logo";
import React from "react";
import {
  User,
  Code,
  Briefcase,
  Award,
  FileText,
  Mail,
  MoreHorizontal,
  Ribbon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
  { icon: User, label: "Profile", active: true },
  { icon: Code, label: "Projects", active: false },
  { icon: Briefcase, label: "Experience", active: false },
  { icon: Award, label: "Honors & Awards", active: false },
  { icon: Ribbon, label: "Certifications", active: false },
  { icon: FileText, label: "Blog / Articles", active: false },
  { icon: Mail, label: "Contact", active: false },
];

const Sidebar = () => {
  return (
    <div className="border-r border-gray-800 p-4 flex flex-col h-screen">
      {" "}
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <Logo size="2xl" />
      </div>
      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all hover:bg-[#FFCC00]/20 ${
              item.active
                ? "bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black font-semibold"
                : "text-white"
            }`}
          >
            <item.icon
              className={`w-6 h-6 ${item.active ? "text-black" : "text-white"}`}
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>
      {/* Profile preview */}
      <div className="flex items-center space-x-3 p-4 mt-auto hover:bg-[#FFCC00]/20 rounded-lg cursor-pointer transition-all">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/api/placeholder/40/40" alt="Sujeeth" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-bold text-white">Sujeeth Memane</div>
          <div className="text-gray-200 text-sm">@Sam</div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
