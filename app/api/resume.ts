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




export async function handleResumeUpload(): Promise<any | null> {
  return new Promise((resolve, reject) => {
    // 1. Create input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.multiple = true;

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) {
        toast.error('No file selected');
        return resolve(null); // Do not proceed if nothing selected
      }

      try {
        const formData = new FormData();
        Array.from(input.files).forEach(file => formData.append('resumes', file));

        const response = await api.post('/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const result = response.data;

        if (!result.success) {
          toast.error(result.message || 'Upload failed');
          return resolve(result);
        }

        // Analyze upload results
        const hasParsingFailures = result.results.some(
          (r: any) => r.status !== 'saved'
        );

        if (hasParsingFailures) {
          toast.success('Some resumes uploaded, some failed to parse');
        } else {
          toast.success('Upload successful 🎉');
        }

        return resolve(result);
      } catch (err: any) {
        console.error('Upload failed:', err);
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            'Something went wrong while uploading'
        );
        reject(err);
      }
    };

    input.click(); // Trigger file dialog
  });
}
