"use client";
import { useState, useEffect } from 'react';

import Link from 'next/link';
import { getResumes } from '../api/resume';
import ProtectedRoute from '../components/ProtectedRoute';

interface Resume {
  title: string;
  createdAt: string;
  resume_url: string;
}

export default function Resumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      const result = await getResumes();
      if (result.success) {
        setResumes(result.data);
      }
      setLoading(false);
    };
    fetchResumes();
  }, []);

  return (
    <ProtectedRoute>

    
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Your Resumes</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to Home
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumes.map((resume, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                <h2 className="text-xl font-semibold text-white mb-2">{resume.title}</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Created: {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                <a
                  href={resume.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors"
                >
                  View Resume
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}