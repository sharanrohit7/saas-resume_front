"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiFileText, FiBriefcase, FiSend, FiUser, FiLogOut } from "react-icons/fi";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseClient";

export default function Sidebar() {
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FiHome className="w-5 h-5" /> },
    { name: "Resume Analysis", href: "/analysis", icon: <FiFileText className="w-5 h-5" /> },
    { name: "My Resumes", href: "/dashboard/resumes", icon: <FiBriefcase className="w-5 h-5" /> },
    { name: "Applied Jobs", href: "/dashboard/applications", icon: <FiSend className="w-5 h-5" /> },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Brand Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">JobFit AI</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-blue-900/30 text-blue-400 border-l-4 border-blue-400"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 px-4 py-3 text-gray-300">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user?.displayName?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-medium">{user?.displayName || "User"}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => auth.signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}