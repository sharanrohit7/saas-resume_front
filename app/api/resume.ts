import toast from "react-hot-toast";
import api from "../lib/axios"
export const getResumes = async () => {
    try {
      const response = await api.get(`/resume/getResumes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resumes:', error);
      return { success: false, data: [] };
    }
  };




type ResumeUploadResult = {
  success: boolean;
  message?: string;
  results: {
    status: 'saved' | string; // adjust this to match your actual API
    [key: string]: unknown;
  }[];
};

export async function handleResumeUpload(): Promise<ResumeUploadResult | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.multiple = true;

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) {
        toast.error('No file selected');
        return resolve(null);
      }

      try {
        const formData = new FormData();
        Array.from(input.files).forEach(file =>
          formData.append('resumes', file)
        );

        const response = await api.post<ResumeUploadResult>(
          '/file/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const result = response.data;

        if (!result.success) {
          toast.error(result.message || 'Upload failed');
          return resolve(result);
        }

        const hasParsingFailures = result.results.some(
          (r) => r.status !== 'saved'
        );

        if (hasParsingFailures) {
          toast.success('Some resumes uploaded, some failed to parse');
        } else {
          toast.success('Upload successful 🎉');
        }

        return resolve(result);
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } }, message?: string };
        console.error('Upload failed:', error);
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong while uploading'
        );
        reject(error);
      }
    };

    input.click(); // Trigger file dialog
  });
}

