import { useState, useEffect } from 'react';
import { getResumes } from '../api/resume';

interface Resume {
  title: string;
  createdAt: string;
  resume_url: string;
  id: string
}

interface ResumesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResume: (url: string, title: string) => void;
}

export default function ResumesPopup({
  isOpen,
  onClose,
  onSelectResume,
}: ResumesPopupProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const fetchResumes = async () => {
        const result = await getResumes();
        if (result.success) {
          setResumes(result.data);
        }
        setLoading(false);
      };
      fetchResumes();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#1f2937] shadow-2xl rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-600 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Select a Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {resumes.map((resume, index) => (
              <div
                key={index}
                className="bg-gray-700 hover:bg-gray-600 cursor-pointer transition p-4 rounded-lg border border-transparent hover:border-blue-500"
                onClick={() => {
                  onSelectResume(resume.id,resume.title);
                  onClose();
                }}
              >
                <h3 className="text-lg font-semibold text-white">{resume.title}</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Created on: {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-blue-400 underline">Click to Select</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



// import { useState, useEffect } from 'react';
// import { getResumes } from '../api/resume';


// interface Resume {
//   title: string;
//   createdAt: string;
//   resume_url: string;
// }

// interface ResumesPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function ResumesPopup({ isOpen, onClose }: ResumesPopupProps) {
//   const [resumes, setResumes] = useState<Resume[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isOpen) {
//       const fetchResumes = async () => {
//         const result = await getResumes();
//         if (result.success) {
//           setResumes(result.data);
//         }
//         setLoading(false);
//       };
//       fetchResumes();
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-white">Your Resumes</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-white"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-32">
//               <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {resumes.map((resume, index) => (
//                 <div key={index} className="bg-gray-700 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-white">{resume.title}</h3>
//                   <p className="text-gray-400 text-sm mb-3">
//                     Created: {new Date(resume.createdAt).toLocaleDateString()}
//                   </p>
//                   <a
//                     href={resume.resume_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm transition-colors"
//                   >
//                     View PDF
//                   </a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }