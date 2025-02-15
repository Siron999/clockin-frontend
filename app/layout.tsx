import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./providers/react-query-provider";

const fontSans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const fontMono = Inter_Tight({
  variable: "--font-inter-tight-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clock In - Time Tracking",
  description: "ClockIn - Time Tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/clockin.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased dark`}
      >
        <SessionProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
