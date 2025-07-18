"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function InterviewQuestionsComingSoon() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-500">
          🎤 Interview Questions – Coming Soon!
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Prepare smarter with AI-curated interview questions tailored to your job role, resume, and company!
        </p>
      </div>

      {/* Feature Flash Mockup */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left mb-16">
        {[
          {
            title: "🎯 Role-specific Questions",
            desc: "Get questions customized for your resume and the job title you're applying for.",
          },
          {
            title: "💬 AI Feedback on Answers",
            desc: "Get instant AI feedback on your answers, tone, and structure.",
          },
          {
            title: "📈 Track Readiness",
            desc: "Gauge your interview readiness score and get improvement tips.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-900 border border-gray-700 p-6 rounded-xl hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Notify Button */}
      <div className="flex flex-col items-center gap-4">
        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-white text-lg font-medium transition">
          🔔 Notify Me When Live
        </button>

        <Link
          href="/dashboard"
          className="text-sm text-gray-400 flex items-center hover:text-blue-400 transition"
        >
          <FiArrowLeft className="mr-1" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
