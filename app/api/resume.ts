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