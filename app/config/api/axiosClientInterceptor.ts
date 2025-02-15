"use client";

import axios from "axios";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    backendToken?: string;
  }
}

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    cache: "no-store",
  },
});

// Only add interceptors if we're in a browser environment
if (typeof window !== "undefined") {
  customAxios.interceptors.request.use(
    async (config) => {
      const session = await getSession();

      if (session?.backendToken) {
        config.headers.Authorization = `Bearer ${session.backendToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  customAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        await signOut({
          callbackUrl: "/signin",
          redirect: true,
        });
      }
      return Promise.reject(error);
    }
  );
}

export default customAxios;
