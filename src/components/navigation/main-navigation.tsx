"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowRightLeft } from "lucide-react";

import { cn } from "@/utils/style";

type NavItemProps = {
  href: string;
  label: string;
};

function NavigationItem({ href, label }: NavItemProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname?.startsWith(href) ? "text-foreground" : "text-foreground/60",
      )}
    >
      {label}
    </Link>
  );
}

export function MainNavigation() {
  return (
    <div className="hidden md:flex">
      <Link href="/" className="mr-6 flex items-center gap-2">
        <ArrowRightLeft />
        <h1 className="hidden scroll-m-20 text-xl font-bold tracking-tight sm:inline-block">
          Go REST
        </h1>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <NavigationItem href="/posts" label="Posts" />
        <NavigationItem href="/users" label="Users" />
      </nav>
    </div>
  );
}
