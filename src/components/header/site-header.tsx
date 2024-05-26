import { MainNavigation } from "@/components/navigation/main-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";

import { ThemeToggle } from "../toggle/theme-toggle";

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-8">
        <MainNavigation />
        <MobileNavigation />
        <ThemeToggle />
      </div>
    </header>
  );
}
