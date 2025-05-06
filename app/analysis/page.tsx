"use client";

import { useState, useEffect } from "react";
import {
  FiUpload,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
  FiAward,
  FiBook,
  FiCode,
  FiBarChart2,
  FiEdit2,
  FiStar,
  FiChevronRight,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";
import Link from "next/link";
import React from "react";
import api from "../lib/axios";
import ResumesPopup from "../components/ResumePopup";

type AnalysisResponse = {
  success: boolean;
  plan: "BASIC" | "PRO";
  data: BasicAnalysisData | AdvancedAnalysisData;
};

type BasicAnalysisData = {
  metadata: {
    job_title_analysis: {
      resume_titles: string[];
      target_title: string;
      similarity_score: number;
    };
    source_validation: {
      resume_sections_used: string[];
      external_sources: string[];
    };
  };
  score_breakdown: {
    ats_score: number;
    components: {
      keywords: number;
      experience: number;
      education: number;
      culture_fit: number;
    };
  };
  gap_analysis: {
    skills: {
      missing_hard: string[];
      missing_soft: string[];
      partial_matches: string[];
    };
    experience: {
      years_diff: number;
      role_gaps: string[];
    };
  };
  recommendations: {
    priority_order: string[];
    action_items: Record<string, string[]>;
  };
  verification_status: {
    needs_clarification: string[];
    sources_checked: string[];
  };
};

// type AdvancedAnalysisData = {
//     summary: string;
//     matches: {
//         exact: string[];
//         partial: string[];
//         missing: string[];
//     };
//     suggestions: Array<{
//         section: string;
//         action: string;
//         example: string;
//     }>;
//     deep_analysis: {
//         keyword_breakdown: {
//             jd_keywords: string[];
//             resume_matches: {
//                 exact: string[];
//                 partial: string[];
//                 missing: string[];
//             };
//             density_analysis: {
//                 ideal_range: string;
//                 current_distribution: Record<string, string>;
//             };
//         };
//         achievement_analysis: {
//             quantified: {
//                 count: number;
//                 examples: string[];
//             };
//             weak_statements: Array<{
//                 original: string;
//                 improved: string;
//                 improvement_reason: string;
//             }>;
//         };
//         competitive_positioning: {
//             strengths: string[];
//             differentiators: string[];
//             market_weaknesses: string[];
//             market_comparison: string[];
//         };
//         optimization_strategies: {
//             immediate: Array<{
//                 section: string;
//                 action: string;
//                 example: string;
//             }>;
//             long_term: Array<{
//                 skill: string;
//                 resource: string;
//             }>;
//         };
//     };
//     readability_analysis: {
//         ats_friendly_score: string;
//         human_readability: {
//             grade_level: string;
//             passive_voice: string;
//         };
//     };
// };
type AdvancedAnalysisData = {
  metadata: {
    job_title_analysis: {
      resume_titles: string[];
      target_title: string;
      similarity_score: number;
    };
    source_validation: {
      resume_sections_used: string[];
      external_sources: string[];
    };
  };
  score_breakdown: {
    ats_score: number;
    components: {
      keywords: number;
      experience: number;
      education: number;
      culture_fit: number;
    };
  };
  gap_analysis: {
    skills: {
      missing_hard: string[];
      missing_soft: string[];
      partial_matches: string[];
    };
    experience: {
      years_diff: number;
      role_gaps: string[];
    };
  };
  recommendations: {
    priority_order: string[];
    action_items: Record<string, string[]>;
  };
  verification_status: {
    needs_clarification: string[];
    sources_checked: string[];
  };
  deep_analysis: {
    keyword_breakdown: {
      jd_keywords: string[];
      resume_matches: {
        exact: string[];
        partial: string[];
        missing: string[];
      };
      density_analysis: {
        ideal_range: string;
        current_distribution: Record<string, string>;
      };
    };
    achievement_analysis: {
      quantified: {
        count: number;
        examples: string[];
      };
      weak_statements: Array<{
        original: string;
        improved: string;
        improvement_reason: string;
      }>;
    };
    competitive_positioning: {
      strengths: string[];
      differentiators: string[];
      market_weaknesses: string[];
    };
    optimization_strategies: {
      immediate: Array<{
        section: string;
        action: string;
        example: string;
      }>;
      long_term: Array<{
        skill: string;
        resource: string;
      }>;
    };
  };
  readability_analysis: {
    ats_friendly_score: number;
    human_readability: {
      grade_level: number;
      passive_voice: string;
    };
  };
};
// type AtsScoreHistory = {
//     date: string;
//     score: number;
// }[];

type AtsScoreHistory = Array<{
  analysis_id: string;
  job_title: string;
  company_name: string;
  ats_score: number;
  created_at: string;
}>;
export default function ResumeAnalysis() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState("");
  const [scoreHistory, setScoreHistory] = useState<AtsScoreHistory>([]);
  const [showResumesPopup, setShowResumesPopup] = useState(false);
  useEffect(() => {
    // Fetch ATS score history
    const fetchScoreHistory = async () => {
      try {
        const response = await api.get("/user/getResumeStat");
        const data = await response.data;
        setScoreHistory(data);
      } catch (err) {
        console.error("Failed to fetch score history", err);
      }
    };

    fetchScoreHistory();
  }, []);
  const analyzeResume = async () => {
    if (!resumeUrl) {
      setError("Please provide a resume URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/analyze`, {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      //     },
      //     body: JSON.stringify({
      //         resume_id: resumeUrl,
      //         job_desc: jobDesc,
      //         company_name: companyName,
      //         job_title: jobTitle,
      //         model: "o3-mini-2025-01-31", // You can also make this dynamic or env-based
      //         queryType: "BASIC"
      //     }),
      // });

      // if (!response.ok) throw new Error("Analysis failed");

      // const data = await response.json();
      // console.log(data.data);
      // setResult(data);
      const response = await api.post("/resume/analyze", {
        resume_id: resumeUrl,
        job_desc: jobDesc,
        company_name: companyName,
        job_title: jobTitle,
        model: "o3-mini-2025-01-31",
        queryType: "BASIC",
      });

      console.log("Full axios response:", response.data);

      // Axios wraps the response in a data property
      const responseData = response.data;

      // Match what your UI expects
      setResult(responseData);
    } catch (err: any) {
      setError(err.message || "Failed to analyze resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2 text-white">Resume Analysis</h1>

      {/* Upgrade Banner (shown for basic plan) */}
      {result?.plan === "BASIC" && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiStar className="text-yellow-300" />
            <span>
              Upgrade to Premium for detailed analysis, keyword optimization,
              and competitive insights
            </span>
          </div>
          <Link
            href="/plans"
            className="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Upgrade Now <FiChevronRight />
          </Link>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Input Form */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Analyze Your Resume
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-400 mb-2">Resume URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    placeholder="https://example.com/resume.pdf"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowResumesPopup(true)}
                    className="bg-gray-700 hover:bg-gray-600 px-4 rounded-lg border border-gray-600 flex items-center gap-2"
                  >
                    <FiUpload /> Select
                  </button>
                  <ResumesPopup
                    isOpen={showResumesPopup}
                    onClose={() => setShowResumesPopup(false)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Backend Engineer"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2">
                Job Description (Optional)
              </label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>

            <button
              onClick={analyzeResume}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                isLoading
                  ? "bg-blue-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              } transition-colors`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" /> Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </button>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-400">
                <FiAlertCircle /> {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6">
              {result.plan === "BASIC" ? (
                <BasicAnalysisView data={result.data as BasicAnalysisData} />
              ) : (
                <AdvancedAnalysisView
                  data={result.data as AdvancedAnalysisData}
                />
              )}
            </div>
          )}
        </div>

        {/* Sidebar with ATS History */}
        <div className="lg:w-80 space-y-6">
          <ATSScoreHistoryCard scores={scoreHistory} />

          {result?.plan === "BASIC" && <UpgradeCard />}
        </div>
      </div>
    </div>
  );
}

function BasicAnalysisView({ data }: { data: BasicAnalysisData }) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Basic Analysis
        </h2>
        <p className="text-gray-400 mb-4">
          Upgrade to Premium for detailed insights, keyword optimization, and
          competitive positioning
        </p>

        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-gray-600 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
            <FiStar className="text-yellow-400" /> What You're Missing in
            Premium
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300 pl-2">
            <li>Detailed keyword density analysis</li>
            <li>Statement-by-statement improvement suggestions</li>
            <li>Competitive positioning vs other candidates</li>
            <li>Market comparison data</li>
            <li>Long-term skill development roadmap</li>
          </ul>
          <Link
            href="/plans"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Upgrade Now
          </Link>
        </div>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-400">
          <h3 className="text-gray-400 mb-2">ATS Score</h3>
          <p className="text-3xl font-bold text-blue-400">
            {data.score_breakdown.ats_score}%
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-purple-400">
          <h3 className="text-gray-400 mb-2">Title Match</h3>
          <p className="text-2xl font-bold text-purple-400">
            {data.metadata.job_title_analysis.similarity_score}%
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Target: {data.metadata.job_title_analysis.target_title}
          </p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
          <FiCode className="text-blue-400" /> Skills Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-gray-300 mb-2">Missing Hard Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.gap_analysis.skills.missing_hard.map((skill, i) => (
                <span
                  key={i}
                  className="bg-red-900/50 text-red-400 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-gray-300 mb-2">Missing Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.gap_analysis.skills.missing_soft.map((skill, i) => (
                <span
                  key={i}
                  className="bg-yellow-900/50 text-yellow-400 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
          <FiCheckCircle className="text-green-400" /> Priority Recommendations
        </h3>
        <div className="space-y-4">
          {data.recommendations.priority_order.map((priority) => (
            <div key={priority} className="bg-gray-700 p-4 rounded-lg">
              <h4 className="capitalize font-medium text-white mb-2">
                {priority} Priority
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {data.recommendations.action_items[priority].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// function AdvancedAnalysisView({ data }: { data: AdvancedAnalysisData }) {
//     return (
//       <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-6">
//         {/* Header */}
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-white">Advanced Analysis</h2>
//             <p className="text-blue-400">Premium Plan Insights</p>
//           </div>
//           <div className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm">
//             ATS Score: {data.score_breakdown.ats_score}%
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <AnalysisCard
//             title="Title Match"
//             value={`${data.metadata.job_title_analysis.similarity_score}%`}
//             description={`vs ${data.metadata.job_title_analysis.target_title}`}
//             icon={<FiBook className="text-purple-400" />}
//             borderColor="border-purple-400"
//           />
//           <AnalysisCard
//             title="Keywords"
//             value={`${data.score_breakdown.components.keywords}%`}
//             description="Match Score"
//             icon={<FiCode className="text-green-400" />}
//             borderColor="border-green-400"
//           />
//           <AnalysisCard
//             title="Experience"
//             value={`${data.score_breakdown.components.experience}%`}
//             description={`${data.gap_analysis.experience.years_diff} year gap`}
//             icon={<FiBarChart2 className="text-yellow-400" />}
//             borderColor="border-yellow-400"
//           />
//           <AnalysisCard
//             title="Readability"
//             value={`${data.readability_analysis.ats_friendly_score}/10`}
//             description={`Grade ${data.readability_analysis.human_readability.grade_level}`}
//             icon={<FiEdit2 className="text-blue-400" />}
//             borderColor="border-blue-400"
//           />
//         </div>

//         {/* Matches Section */}
//         <Section title="Keyword Analysis" icon={<FiCode />}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <MatchBox
//               type="exact"
//               items={data.deep_analysis.keyword_breakdown.resume_matches.exact}
//               color="green"
//             />
//             <MatchBox
//               type="partial"
//               items={data.deep_analysis.keyword_breakdown.resume_matches.partial}
//               color="yellow"
//             />
//             <MatchBox
//               type="missing"
//               items={data.deep_analysis.keyword_breakdown.resume_matches.missing}
//               color="red"
//             />
//           </div>

//           <div className="mt-4 bg-gray-700 p-4 rounded-lg">
//             <h4 className="text-gray-300 mb-2">Keyword Density</h4>
//             <div className="space-y-3">
//               {Object.entries(data.deep_analysis.keyword_breakdown.density_analysis.current_distribution).map(([keyword, density]) => (
//                 <div key={keyword}>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span className="text-gray-300">{keyword}</span>
//                     <span className={density === "0%" ? "text-red-400" : "text-blue-400"}>{density}</span>
//                   </div>
//                   <div className="w-full bg-gray-600 rounded-full h-2">
//                     <div
//                       className={`h-2 rounded-full ${
//                         density === "0%" ? "bg-red-400" :
//                         parseFloat(density) < 2 ? "bg-yellow-400" : "bg-green-400"
//                       }`}
//                       style={{ width: density }}
//                     />
//                   </div>
//                 </div>
//               ))}
//               <p className="text-gray-500 text-xs mt-2">
//                 Ideal range: {data.deep_analysis.keyword_breakdown.density_analysis.ideal_range}
//               </p>
//             </div>
//           </div>
//         </Section>

//         {/* Recommendations */}
//         <Section title="Optimization Plan" icon={<FiCheckCircle />}>
//           <div className="space-y-4">
//             {data.recommendations.priority_order.map(priority => (
//               <div key={priority} className="bg-gray-700 p-4 rounded-lg">
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     priority === "critical" ? "bg-red-900 text-red-300" :
//                     priority === "high" ? "bg-yellow-900 text-yellow-300" :
//                     "bg-blue-900 text-blue-300"
//                   }`}>
//                     {priority} priority
//                   </span>
//                   <h4 className="font-medium text-white">{priority} Improvements</h4>
//                 </div>
//                 <ul className="list-disc list-inside space-y-1 text-gray-300">
//                   {data.recommendations.action_items[priority].map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </Section>

//         {/* Competitive Positioning */}
//         <Section title="Competitive Edge" icon={<FiAward />}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-green-400">
//               <h4 className="text-gray-300 mb-2">Strengths</h4>
//               <ul className="space-y-2">
//                 {data.deep_analysis.competitive_positioning.strengths.map((strength, i) => (
//                   <li key={i} className="flex items-start gap-2">
//                     <FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" />
//                     <span className="text-gray-300">{strength}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-400">
//               <h4 className="text-gray-300 mb-2">Differentiators</h4>
//               <ul className="space-y-2">
//                 {data.deep_analysis.competitive_positioning.differentiators.map((diff, i) => (
//                   <li key={i} className="flex items-start gap-2">
//                     <FiStar className="text-blue-400 mt-0.5 flex-shrink-0" />
//                     <span className="text-gray-300">{diff}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-red-400">
//               <h4 className="text-gray-300 mb-2">Market Weaknesses</h4>
//               <ul className="space-y-2">
//                 {data.deep_analysis.competitive_positioning.market_weaknesses.map((weakness, i) => (
//                   <li key={i} className="flex items-start gap-2">
//                     <FiAlertCircle className="text-red-400 mt-0.5 flex-shrink-0" />
//                     <span className="text-gray-300">{weakness}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </Section>

//         {/* Achievement Analysis */}
//         <Section title="Achievements" icon={<FiBarChart2 />}>
//           <div className="bg-gray-700 p-4 rounded-lg">
//             <h4 className="text-gray-300 mb-2">
//               Quantified Impact ({data.deep_analysis.achievement_analysis.quantified.count})
//             </h4>
//             <ul className="list-disc list-inside space-y-1 text-gray-300">
//               {data.deep_analysis.achievement_analysis.quantified.examples.map((example, i) => (
//                 <li key={i}>{example}</li>
//               ))}
//             </ul>
//           </div>

//           {data.deep_analysis.achievement_analysis.weak_statements.length > 0 && (
//             <div className="mt-4 bg-gray-700 p-4 rounded-lg">
//               <h4 className="text-gray-300 mb-2">Statement Improvements</h4>
//               <div className="space-y-4">
//                 {data.deep_analysis.achievement_analysis.weak_statements.map((statement, i) => (
//                   <div key={i} className="border-l-4 border-blue-400 pl-4">
//                     <p className="text-gray-400 text-sm mb-1">Original:</p>
//                     <p className="text-gray-300 mb-2">{statement.original}</p>
//                     <p className="text-gray-400 text-sm mb-1">Improved:</p>
//                     <p className="text-green-400 mb-1">{statement.improved}</p>
//                     <p className="text-gray-500 text-xs">{statement.improvement_reason}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </Section>
//       </div>
//     );
//   }

// Helper Components
function AnalysisCard({
  title,
  value,
  description,
  icon,
  borderColor,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
}) {
  return (
    <div className={`bg-gray-700 p-4 rounded-lg border-l-4 ${borderColor}`}>
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        {icon}
        <h3 className="text-sm">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  );
}
function AdvancedAnalysisView({ data }: { data: AdvancedAnalysisData }) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-8">
      {/* Header with Score */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Advanced Resume Analysis
          </h2>
          <p className="text-blue-400">Premium Insights</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-blue-900/30 text-blue-400 px-4 py-2 rounded-lg">
            <div className="text-xs text-blue-300">Overall ATS Score</div>
            <div className="text-2xl font-bold">
              {data.score_breakdown.ats_score}%
            </div>
          </div>
          <div className="bg-purple-900/30 text-purple-400 px-4 py-2 rounded-lg">
            <div className="text-xs text-purple-300">Title Match</div>
            <div className="text-2xl font-bold">
              {data.metadata.job_title_analysis.similarity_score}%
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
          <FiBarChart2 className="text-blue-400" /> Score Breakdown
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScorePill
            title="Keywords"
            score={data.score_breakdown.components.keywords}
            ideal={90}
          />
          <ScorePill
            title="Experience"
            score={data.score_breakdown.components.experience}
            ideal={80}
          />
          <ScorePill
            title="Education"
            score={data.score_breakdown.components.education}
            ideal={75}
          />
          <ScorePill
            title="Culture Fit"
            score={data.score_breakdown.components.culture_fit}
            ideal={70}
          />
        </div>
      </div>

      {/* Keyword Analysis */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
          <FiCode className="text-blue-400" /> Keyword Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <KeywordMatchBox
            type="exact"
            items={data.deep_analysis.keyword_breakdown.resume_matches.exact}
            count={
              data.deep_analysis.keyword_breakdown.resume_matches.exact.length
            }
          />
          <KeywordMatchBox
            type="partial"
            items={data.deep_analysis.keyword_breakdown.resume_matches.partial}
            count={
              data.deep_analysis.keyword_breakdown.resume_matches.partial.length
            }
          />
          <KeywordMatchBox
            type="missing"
            items={data.deep_analysis.keyword_breakdown.resume_matches.missing}
            count={
              data.deep_analysis.keyword_breakdown.resume_matches.missing.length
            }
          />
        </div>

        <h4 className="text-gray-300 mb-3">Keyword Density Analysis</h4>
        <div className="space-y-4">
          {Object.entries(
            data.deep_analysis.keyword_breakdown.density_analysis
              .current_distribution
          ).map(([keyword, density]) => (
            <div key={keyword}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{keyword}</span>
                <span
                  className={
                    parseFloat(density) === 0 ? "text-red-400" : "text-blue-400"
                  }
                >
                  {density}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    parseFloat(density) === 0
                      ? "bg-red-400"
                      : parseFloat(density) < 2
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                  style={{
                    width: `${Math.min(100, parseFloat(density) * 10)}%`,
                  }}
                />
              </div>
            </div>
          ))}
          <p className="text-gray-500 text-xs mt-2">
            Ideal density range:{" "}
            {data.deep_analysis.keyword_breakdown.density_analysis.ideal_range}
          </p>
        </div>
      </div>

      {/* Gap Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
            <FiAlertCircle className="text-red-400" /> Skills Gap
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-400 mb-2">Missing Hard Skills</h4>
              <div className="flex flex-wrap gap-2">
                {data.gap_analysis.skills.missing_hard.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-red-900/30 text-red-400 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-400 mb-2">Missing Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {data.gap_analysis.skills.missing_soft.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-yellow-900/30 text-yellow-400 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-400 mb-2">Partial Matches</h4>
              <div className="flex flex-wrap gap-2">
                {data.gap_analysis.skills.partial_matches.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
            <FiClock className="text-purple-400" /> Experience Gap
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-400 mb-2">Years Difference</h4>
              <p className="text-white">
                {data.gap_analysis.experience.years_diff} year(s) gap
              </p>
            </div>
            <div>
              <h4 className="text-gray-400 mb-2">Role Gaps</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {data.gap_analysis.experience.role_gaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
          <FiCheckCircle className="text-green-400" /> Optimization
          Recommendations
        </h3>
        <div className="space-y-6">
          {data.recommendations.priority_order.map((priority) => (
            <div key={priority} className="space-y-2">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  priority === "critical"
                    ? "bg-red-900/30 text-red-400"
                    : priority === "high"
                    ? "bg-yellow-900/30 text-yellow-400"
                    : "bg-blue-900/30 text-blue-400"
                }`}
              >
                {priority} priority
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-300 pl-2">
                {data.recommendations.action_items[priority].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive Positioning */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
          <FiAward className="text-yellow-400" /> Competitive Positioning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-900/10 p-4 rounded-lg border border-green-800/50">
            <h4 className="text-green-400 mb-3">Strengths</h4>
            <ul className="space-y-2">
              {data.deep_analysis.competitive_positioning.strengths.map(
                (strength, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{strength}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-800/50">
            <h4 className="text-blue-400 mb-3">Differentiators</h4>
            <ul className="space-y-2">
              {data.deep_analysis.competitive_positioning.differentiators.map(
                (diff, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiStar className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{diff}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="bg-red-900/10 p-4 rounded-lg border border-red-800/50">
            <h4 className="text-red-400 mb-3">Market Weaknesses</h4>
            <ul className="space-y-2">
              {data.deep_analysis.competitive_positioning.market_weaknesses.map(
                (weakness, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiAlertCircle className="text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{weakness}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Achievement Analysis */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
          <FiTrendingUp className="text-purple-400" /> Achievement Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-400 mb-3">Quantified Achievements</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300 pl-2">
              {data.deep_analysis.achievement_analysis.quantified.examples.map(
                (example, i) => (
                  <li key={i}>{example}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 mb-3">Statement Improvements</h4>
            <div className="space-y-4">
              {data.deep_analysis.achievement_analysis.weak_statements.map(
                (statement, i) => (
                  <div key={i} className="border-l-2 border-blue-400 pl-4">
                    <p className="text-gray-400 text-sm mb-1">Original:</p>
                    <p className="text-gray-300 mb-2 text-sm">
                      {statement.original}
                    </p>
                    <p className="text-gray-400 text-sm mb-1">Improved:</p>
                    <p className="text-green-400 mb-1 text-sm">
                      {statement.improved}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {statement.improvement_reason}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function ScorePill({
  title,
  score,
  ideal,
}: {
  title: string;
  score: number;
  ideal: number;
}) {
  const percentage = (score / ideal) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#2D3748"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={
              percentage >= 75
                ? "#48BB78"
                : percentage >= 50
                ? "#ECC94B"
                : "#F56565"
            }
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {score}%
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-300">{title}</div>
        <div className="text-xs text-gray-500">Target: {ideal}%</div>
      </div>
    </div>
  );
}

function KeywordMatchBox({
  type,
  items,
  count,
}: {
  type: string;
  items: string[];
  count: number;
}) {
  const colorMap = {
    exact: {
      bg: "bg-green-900/20",
      text: "text-green-400",
      border: "border-green-400/30",
    },
    partial: {
      bg: "bg-yellow-900/20",
      text: "text-yellow-400",
      border: "border-yellow-400/30",
    },
    missing: {
      bg: "bg-red-900/20",
      text: "text-red-400",
      border: "border-red-400/30",
    },
  };

  const { bg, text, border } = colorMap[type as keyof typeof colorMap];

  return (
    <div className={`p-4 rounded-lg border ${border} ${bg}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className={`text-sm font-medium capitalize ${text}`}>
          {type} Matches
        </h4>
        <span className={`text-xs px-2 py-1 rounded-full ${bg} ${text}`}>
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.slice(0, 5).map((item, i) => (
          <span
            key={i}
            className={`text-xs px-2 py-1 rounded-full ${bg} ${text} border ${border}`}
          >
            {item}
          </span>
        ))}
        {items.length === 0 && (
          <span className="text-xs text-gray-500">None found</span>
        )}
      </div>
    </div>
  );
}
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
        {React.cloneElement(icon, { className: "text-blue-400" })}
        {title}
      </h3>
      {children}
    </div>
  );
}

function MatchBox({
  type,
  items,
  color,
}: {
  type: string;
  items: string[];
  color: "green" | "yellow" | "red";
}) {
  const colorClasses = {
    green: "bg-green-900/50 text-green-400 border-green-400/30",
    yellow: "bg-yellow-900/50 text-yellow-400 border-yellow-400/30",
    red: "bg-red-900/50 text-red-400 border-red-400/30",
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h4 className="text-gray-300 mb-2 capitalize">
        {type} Matches ({items.length})
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.slice(0, 5).map((item, i) => (
          <span
            key={i}
            className={`px-3 py-1 rounded-full text-sm border ${colorClasses[color]}`}
          >
            {item}
          </span>
        ))}
        {items.length === 0 && (
          <span className="text-gray-500 text-sm">None found</span>
        )}
      </div>
    </div>
  );
}

// function ATSScoreHistoryCard({ scores }: { scores: AtsScoreHistory }) {
//     return (
//         <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
//             <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
//                 <FiBarChart2 className="text-blue-400" /> Your ATS Score History
//             </h3>

//             {scores.length === 0 ? (
//                 <p className="text-gray-400">No analysis history yet</p>
//             ) : (
//                 <div className="space-y-3">
//                     {scores.slice(0, 5).map((score, i) => (
//                         <div key={i} className="flex items-center justify-between">
//                             <div className="text-gray-300">{score.date}</div>
//                             <div className="flex items-center gap-2">
//                                 <div className="w-24 bg-gray-700 rounded-full h-2">
//                                     <div
//                                         className="bg-blue-400 h-2 rounded-full"
//                                         style={{ width: `${score.score * 20}%` }}
//                                     />
//                                 </div>
//                                 <span className="text-blue-400 font-medium">{score.score}/5</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {scores.length > 5 && (
//                 <button className="mt-4 text-blue-400 text-sm hover:underline">
//                     View all {scores.length} analyses
//                 </button>
//             )}
//         </div>
//     );
// }

function ATSScoreHistoryCard({ scores }: { scores: AtsScoreHistory }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
        <FiBarChart2 className="text-blue-400" /> Your ATS Score History
      </h3>

      {scores.length === 0 ? (
        <p className="text-gray-400">No analysis history yet</p>
      ) : (
        <div className="space-y-4">
          {scores.slice(0, 5).map((score) => (
            <Link
              key={score.analysis_id}
              href={`/analysis/${score.analysis_id}`}
              className="block hover:bg-gray-700/50 rounded-lg p-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">{score.job_title}</p>
                  <p className="text-gray-400 text-sm">{score.company_name}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {formatDate(score.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                      style={{ width: `${score.ats_score}%` }}
                    />
                  </div>
                  <span className="text-blue-400 font-medium w-10 text-right">
                    {score.ats_score}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {scores.length > 5 && (
        <Link
          href="/history"
          className="mt-4 inline-flex items-center text-blue-400 text-sm hover:underline"
        >
          View all {scores.length} analyses <FiChevronRight className="ml-1" />
        </Link>
      )}
    </div>
  );
}
function UpgradeCard() {
  return (
    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl border border-blue-700/30 p-6">
      <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
        <FiStar className="text-yellow-400" /> Unlock Premium Features
      </h3>
      <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4 pl-2">
        <li>Detailed keyword analysis</li>
        <li>Competitive positioning</li>
        <li>Statement-by-statement improvements</li>
        <li>Unlimited resume analyses</li>
      </ul>
      <Link
        href="/plans"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2 rounded-lg font-medium text-center block transition-colors"
      >
        Upgrade Now
      </Link>
    </div>
  );
}
