"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ArrowRightLeft, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/utils/style";

const navigations = [
  {
    href: "/posts",
    label: "Posts",
  },
  {
    href: "/users",
    label: "Users",
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center gap-2"
          onOpenChange={setOpen}
        >
          <ArrowRightLeft />
          <span className="font-bold text-primary">Go REST</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 pt-6 text-muted-foreground/80">
              {navigations.map((navigation) => (
                <SidebarItem
                  key={navigation.href}
                  navigation={navigation}
                  onOpenChange={setOpen}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

type SidebarItemProps = {
  navigation: { href: string; label: string };
  onOpenChange?: (open: boolean) => void;
};

function SidebarItem({ navigation, onOpenChange }: SidebarItemProps) {
  const pathname = usePathname();

  const router = useRouter();

  const className = useMemo(
    () =>
      cn(
        "font-normal py-1",
        navigation.href &&
          pathname?.startsWith(navigation.href) &&
          "font-bold text-muted-foreground",
      ),
    [navigation.href, pathname],
  );

  return (
    <Link
      href={navigation.href}
      onClick={() => {
        router.push(navigation.href);
        onOpenChange?.(false);
      }}
      className={cn(className)}
    >
      {navigation.label}
    </Link>
  );
}
