"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { DonezoLogo } from "../icons/Logo";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const isScrolled = window?.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header header-height ${scrolled ? "scrolled" : ""}`}>
      <div className="flex flex-row items-center justify-between text-black h-[10vh] w-full px-8">
        <div className="flex flex-row">
          <Link href="/">
            {" "}
            <DonezoLogo color="white" />
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-4 text-white font-medium text-lg">
          {session && session.user?.name && pathname !== "/" ? (
            `Welcome ${session.user?.name}`
          ) : (
            <Link href="/signin">Let&apos;s Get Started!</Link>
          )}
        </div>
      </div>
    </header>
  );
}
