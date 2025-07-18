// 'use client';

// import { useState } from 'react';
// import { Loader2 } from 'lucide-react';
// import { handleResumeUpload } from '../api/resume';

// type ResumeUploadResult = {
//   success: boolean;
//   message?: string;
//   results: {
//     status: 'saved' | string;
//     [key: string]: unknown;
//   }[];
// };

// interface UploadResumeButtonProps {
//   onSuccess?: (result: ResumeUploadResult) => void;
//   onError?: (error: string) => void;
//   className?: string;
// }

// export default function UploadResumeButton({
//   onSuccess,
//   onError,
//   className = '',
// }: UploadResumeButtonProps) {
//   const [uploading, setUploading] = useState(false);

//   const handleClick = async () => {
//     try {
//       setUploading(true);
//       const result = await handleResumeUpload();

//       if (!result) return; // No file selected or upload cancelled

//       if (!result.success) {
//         onError?.(result.message || 'Upload failed');
//       } else {
//         onSuccess?.(result);
//       }
//     } catch (err) {
//       const error = err as { message?: string };
//       onError?.(error.message || 'Something went wrong');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       disabled={uploading}
//       className={`w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
//         uploading ? 'opacity-70 cursor-not-allowed' : ''
//       } ${className}`}
//     >
//       {uploading ? (
//         <>
//           <Loader2 className="w-5 h-5 animate-spin" />
//           Uploading...
//         </>
//       ) : (
//         'Upload New Resume'
//       )}
//     </button>
//   );
// }

'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { handleResumeUpload } from '../api/resume';

type ResumeUploadResult = {
  success: boolean;
  message?: string;
  results: {
    status: 'saved' | string;
    [key: string]: unknown;
  }[];
};

interface UploadResumeButtonProps {
  onSuccess?: (result: ResumeUploadResult) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function UploadResumeButton({
  onSuccess,
  onError,
  className = '',
}: UploadResumeButtonProps) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    try {
      setUploading(true);
      setStatus('idle');

      const result = await handleResumeUpload();
      if (!result) return;

      if (!result.success) {
        onError?.(result.message || 'Upload failed');
        setStatus('error');
      } else {
        onSuccess?.(result);
        setStatus('success');
      }
    } catch (err) {
      const error = err as { message?: string };
      onError?.(error.message || 'Something went wrong');
      setStatus('error');
    } finally {
      setUploading(false);
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const renderLabel = () => {
    if (uploading) {
      return (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Uploading...
        </>
      );
    }

    if (status === 'success') {
      return (
        <>
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Uploaded!
        </>
      );
    }

    if (status === 'error') {
      return (
        <>
          <XCircle className="w-5 h-5 text-red-500" />
          Failed!
        </>
      );
    }

    return 'Upload New Resume';
  };

  return (
    <button
      onClick={handleClick}
      disabled={uploading}
      className={`w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
        uploading ? 'opacity-70 cursor-not-allowed' : ''
      } ${className}`}
    >
      {renderLabel()}
    </button>
  );
}
