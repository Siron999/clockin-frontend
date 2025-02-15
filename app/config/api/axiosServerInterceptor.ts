import axios from "axios";
import { auth } from "@/auth";

const customAxiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxiosServer.interceptors.request.use(
  async (config) => {
    const session = await auth();

    if (session?.backendToken) {
      config.headers.Authorization = `Bearer ${session.backendToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxiosServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxiosServer;
