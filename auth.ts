import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import { ApiResponse, LoginResponse } from "./types";
import { cookies } from "next/headers";

export const authOptions: NextAuthConfig = {
  providers: [GoogleProvider],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 1 * 24 * 60 * 60, // 1 days
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
  events: {
    async signOut() {
      //clear the backend token cookie
      const cookieStore = await cookies();
      cookieStore.delete("backendToken");
      return Promise.resolve();
    },
  },
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile?: any;
    }) {
      if (account?.provider === "google" && account.id_token) {
        try {
          console.log(
            "Signing in with Google account:",
            `${process.env.BACKEND_URL}/api/v1/auth/google-signin`
          );
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/auth/google-signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                googleToken: account.id_token,
                email: profile?.email,
              }),
            }
          );

          if (!response.ok) {
            console.error(
              `Backend authentication failed with status: ${response.status}`
            );
            return false;
          }

          const { data }: ApiResponse<LoginResponse> = await response.json();

          if (!data) {
            console.error("Invalid response from backend:", data);
            return false;
          }

          if (!data.token || !data.user?.id) {
            console.error("Invalid response from backend. Empty:", data);
            return false;
          }

          account.backendToken = data.token;
          account.userId = data.user.id;

          // Set custom cookies in the response
          const cookieStore = await cookies();

          // Set a secure HTTP-only cookie
          cookieStore.set("backendToken", data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
          });
          return true;
        } catch (error) {
          console.error("Backend authentication failed:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.backendToken = account.backendToken;
        token.userId = account.userId;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.backendToken = token.backendToken;
      if (token.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  trustHost: true,
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
