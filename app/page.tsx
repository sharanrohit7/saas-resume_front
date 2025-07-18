"use client";


import LoginCard from "./components/Login";
import Footer from "./components/Footer";


export default function Home() {
  const handleScrollToLogin = () => {
  const loginSection = document.getElementById('login');
  if (loginSection) {
    loginSection.scrollIntoView({ behavior: 'smooth' });
  }
};
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="text-2xl font-bold text-blue-400">JobFit AI</div>
        <button
          onClick={handleScrollToLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:flex md:items-center">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Beat the ATS & Get More Interviews
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Upload your resume and job description – our AI analyzes gaps,
            suggests improvements, and finds matching jobs in seconds.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleScrollToLogin}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-500 transition-colors inline-block"
            >
              Sign Up Free
            </button>

            <button className="border-2 border-gray-700 text-gray-300 px-8 py-4 rounded-lg text-lg hover:border-blue-400 hover:text-white transition-colors">
              How It Works →
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0">
          {/* Dashboard Mockup */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold text-white">
                Resume Score: <span className="text-blue-400">82% Match</span>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-300">
                  Missing Skills: React, TypeScript
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="font-medium text-white">SDE 2 at Amazon</div>
                <div className="text-sm text-gray-400">
                  New York, NY • Full-time
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why JobFit AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Deep Resume Analysis",
                desc: "Identifies missing keywords and suggests ATS-friendly rewrites",
              },
              {
                icon: "🎯",
                title: "Smart Job Matching",
                desc: "Searches 1000s of listings to find your perfect role",
              },
              {
                icon: "📈",
                title: "Competitive Edge",
                desc: "See how you stack against other applicants",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-700 p-8 rounded-xl border border-gray-600 hover:border-blue-400 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login/Signup Section */}
      <section id="login" className="container mx-auto px-6 py-20 max-w-md">
        <LoginCard />
      </section>
      <Footer />
    </div>
  );
}
