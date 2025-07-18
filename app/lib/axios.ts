import axios from 'axios';
import { auth } from './firebaseClient';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      auth.signOut();
      console.error("Error from api and redirecting ", error.response)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
