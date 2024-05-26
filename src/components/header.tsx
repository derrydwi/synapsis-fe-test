"use client";

import Link from "next/link";

import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-8">
        <MainNav />
        <MobileNav />
        <ThemeToggle />
      </div>
    </header>
  );
}
