import Logo from "../common/Logo";
import React from "react";
import {
  User,
  Code,
  Briefcase,
  Award,
  FileText,
  Mail,
  Ribbon,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: Code, label: "Projects", path: "/projects" },
  { icon: Briefcase, label: "Experience", path: "/experience" },
  { icon: Award, label: "Honors & Awards", path: "/honors" },
  { icon: Ribbon, label: "Certifications", path: "/certifications" },
  { icon: FileText, label: "Blog / Articles", path: "/blog" },
  { icon: Mail, label: "Contact", path: "/dashboard/contact" },
];

const Sidebar = () => {
  return (
    <div className="border-r border-gray-800 p-4 flex flex-col h-screen">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <Logo size="2xl" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all hover:bg-[#FFCC00]/20 ${
                isActive
                  ? "bg-gradient-to-r from-[#FFCC00] to-[#FFD700] text-black font-semibold"
                  : "text-white"
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <div className="mt-auto">
        <div className="flex items-center bg-white hover:bg-white/90 space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all mb-3">
          <Settings className="w-6 h-6 text-black" />
          <span className="text-sm text-black">Settings</span>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-3 p-4 hover:bg-[#FFCC00]/20 rounded-lg cursor-pointer transition-all">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/api/placeholder/40/40" alt="Sujeeth" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-bold text-white">Sujeeth Memane</div>
            <div className="text-gray-200 text-sm">@Sam</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
