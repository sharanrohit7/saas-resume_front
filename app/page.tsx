"use client";

import Link from "next/link";
import Footer from "./components/Footer";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./lib/firebaseClient";
import { signInUser, User } from "./api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);

      const signInData: User = {
        email: user.email || "",
        firebaseUID: user.uid,
        photoURL: user.photoURL || "",
        authProvider: "GOOGLE",
        country: "IN",
      };

      await signInUser(signInData);
      router.push("/analysis"); // After login
    } catch (error) {
      console.error("Google Login failed:", error);
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-8 py-5 bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-500">JobFit AI</div>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg text-white font-medium transition"
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Unlock More Interviews with <span className="text-blue-500">AI-Powered</span> Resume Analysis
          </h1>
          <p className="text-lg text-gray-300">
            Upload your resume, match it to jobs, and improve it using our smart ATS feedback system.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-white text-lg font-medium transition"
            >
              Start Free
            </button>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-gray-600 hover:border-blue-400 text-gray-300 rounded-lg text-lg transition"
            >
              View Plans
            </Link>
          </div>
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>

        {/* Mockup */}
        <div className="md:w-1/2 mt-12 md:mt-0">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md mx-auto shadow-lg">
            <div className="text-lg font-semibold mb-4 text-white">
              Resume Score: <span className="text-blue-400">82% Match</span>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-sm text-gray-300 mb-2">
              🔍 Missing Skills: React, TypeScript, AWS
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-white font-medium">
              📄 Target Role: SDE 2 at Amazon
              <div className="text-sm text-gray-400 mt-1">
                New York, NY • Full-time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown */}
      <section className="bg-gray-900 py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "🧠",
              title: "Basic Resume Score",
              desc: "Understand where you stand vs job descriptions.",
            },
            {
              icon: "🚀",
              title: "Pro Resume Rewrite",
              desc: "Get AI-powered suggestions to beat ATS filters.",
            },
            {
              icon: "📊",
              title: "Compare Against Peers",
              desc: "Benchmark your resume with industry peers.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-gradient-to-t from-gray-950 to-gray-900 py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">Coming Soon 🚧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: "🔍",
              title: "AI Job Search",
              desc: "Auto-scan 1000s of jobs and match based on resume + JD fit.",
            },
            {
              icon: "🎤",
              title: "AI Interview Prep",
              desc: "Smart Q&A training based on target job role and resume.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-xl border border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 transition"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
