"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72 p-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] border-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <SheetHeader className="p-6 pb-4">
            <SheetTitle asChild>
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setOpen(false)}
              >
                <Image src="/logo.webp" width={70} height={28} alt="Logo" />
              </Link>
            </SheetTitle>
          </SheetHeader>

          {/* Navigation Section */}
          <div className="flex-1 px-6">
            <SignedIn>
              {/* Top Section - First 6 navLinks */}
              <div className="flex flex-col gap-1">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = pathname === link.route;
                  return (
                    <Link
                      key={link.label}
                      href={link.route}
                      className={`sidebar-link ${
                        isActive ? "sidebar-link-active" : ""
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <link.icon className="sidebar-icon" />
                      <span className="sidebar-label">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Gap between sections */}
              <div className="flex-1 my-4"></div>

              {/* Bottom Section - Remaining navLinks + UserButton */}
              <div className="flex flex-col gap-1">
                {navLinks.slice(6).map((link) => {
                  const isActive = pathname === link.route;
                  return (
                    <Link
                      key={link.label}
                      href={link.route}
                      className={`sidebar-link ${
                        isActive ? "sidebar-link-active" : ""
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <link.icon className="sidebar-icon" />
                      <span className="sidebar-label">{link.label}</span>
                    </Link>
                  );
                })}

                {/* User Button */}
                <div className="sidebar-link">
                  <UserButton afterSwitchSessionUrl="/" showName />
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <Button asChild className="bg-purple-gradient bg-cover w-full">
                <Link href="/sign-in" onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
