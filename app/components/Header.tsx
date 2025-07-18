'use client';

import Link from 'next/link';
import { FiBell, FiUser, FiPlusCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { getUserCredits } from '../api/credits';
import { usePathname } from 'next/navigation';
let hasFetched = false;
export default function Header() {
   const pathname = usePathname();
  const [credits, setCredits] = useState<number | null>(null);

 useEffect(() => {
    if (hasFetched) return;
    hasFetched = true;

    const fetchCredits = async () => {
      const result = await getUserCredits();
      if (result.success && result.balance){
        setCredits(result.balance.creditsBalance);
      } else {
        console.warn("Could not fetch user credits.");
        setCredits(0);
      }
    };

    fetchCredits();
  }, []);
    const getPageTitle = (path: string): string => {
    const pageMap: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/analysis': 'Resume Analysis',
      '/resumes': 'Resumes',
      '/credits': 'Credits',
    };

    return pageMap[path] || 'JobFit AI';
  };
  return (
    <header className="sticky top-0 z-40 w-full bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
   <h2 className="text-2xl font-semibold text-white">
        {getPageTitle(pathname)}
      </h2>

      <div className="flex items-center gap-6">
        {/* Credits Section */}
        <Link
          href="/credits"
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-sm text-white rounded-md hover:bg-blue-600 transition border border-gray-600"
        >
          <FiPlusCircle className="w-4 h-4 text-blue-300" />
          <span className="font-medium">Credits: {credits}</span>
        </Link>

        {/* Notification icon */}
        <button
          className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition"
          aria-label="Notifications"
        >
          <FiBell className="w-5 h-5" />
        </button>

        {/* Profile icon */}
        <button
          className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition"
          aria-label="Profile"
        >
          <FiUser className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
