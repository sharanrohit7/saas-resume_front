




"use client";

import ProtectedRoute from '../components/ProtectedRoute';
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from '../lib/firebaseClient';

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/"); // Redirect if not logged in
  }, [user, loading]);

  if (loading) return <LoadingSpinner />;

  return (
    <ProtectedRoute>

    
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="text-2xl font-bold text-blue-400">JobFit AI</div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
            <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user?.displayName?.charAt(0) || "U"}
            </span>
            <span>{user?.displayName || "User"}</span>
          </button>
        </div>
      </nav>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.displayName?.split(" ")[0] || "User"}!</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Resume Score" 
            value="87%" 
            trend="↑ 12%"
            icon="📊"
            color="text-blue-400"
          />
          <StatCard 
            title="Jobs Applied" 
            value="14" 
            trend="3 this week"
            icon="📨"
            color="text-green-400"
          />
          <StatCard 
            title="Interview Rate" 
            value="42%" 
            trend="Industry avg: 28%"
            icon="🎯"
            color="text-purple-400"
          />
        </div>

        {/* Recent Activity & Resume Analyzer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resume Analyzer */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-400">✨</span> Resume Analyzer
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-400">
                <h3 className="font-medium">Missing Keywords</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["TypeScript", "AWS", "Agile", "CI/CD"].map((skill) => (
                    <span key={skill} className="bg-gray-600 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors">
                Upload New Resume
              </button>
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-400">⏳</span> Recent Jobs
            </h2>
            <div className="space-y-4">
              {[
                { company: "Amazon", role: "SDE II", match: "92%", status: "Applied" },
                { company: "Google", role: "Frontend Engineer", match: "85%", status: "Interview" },
                { company: "Microsoft", role: "Cloud Architect", match: "78%", status: "Saved" },
              ].map((job, i) => (
                <div key={i} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{job.role}</h3>
                      <p className="text-gray-400 text-sm">{job.company}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      job.status === "Applied" ? "bg-blue-900 text-blue-300" :
                      job.status === "Interview" ? "bg-green-900 text-green-300" :
                      "bg-gray-600 text-gray-300"
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full" 
                        style={{ width: job.match }}
                      />
                    </div>
                    <span className="text-sm text-blue-400">{job.match}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}

// Components
function StatCard({ title, value, trend, icon, color }: { 
  title: string; 
  value: string; 
  trend: string; 
  icon: string; 
  color: string;
}) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-400 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-gray-500 text-sm mt-3">{trend}</p>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
    </div>
  );
}