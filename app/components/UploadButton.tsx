'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';
import { handleResumeUpload } from '../api/resume';

interface UploadResumeButtonProps {
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function UploadResumeButton({
  onSuccess,
  onError,
  className = '',
}: UploadResumeButtonProps) {
  const [uploading, setUploading] = useState(false);

  const handleClick = async () => {
    try {
      setUploading(true);
      const result = await handleResumeUpload();

      if (!result) return; // upload canceled or failed quietly

      if (!result.success) {
        onError?.(result.message || 'Upload failed');
      } else {
        onSuccess?.(result);
      }
    } catch (err: any) {
      onError?.(err.message || 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={uploading}
      className={`w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
        uploading ? 'opacity-70 cursor-not-allowed' : ''
      } ${className}`}
    >
      {uploading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Uploading...
        </>
      ) : (
        'Upload New Resume'
      )}
    </button>
  );
}
