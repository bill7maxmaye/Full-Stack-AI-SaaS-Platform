"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-6">
        {/* Logo Section */}
        <Link href="/" className="sidebar-logo">
          <Image src="/logo.webp" width={70} height={28} alt="Logo" />
        </Link>

        {/* Navigation Section */}
        <nav className="sidebar-nav">
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
                  >
                    <link.icon className="sidebar-icon" />
                    <span className="sidebar-label">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Gap between sections */}
            <div className="flex-1"></div>

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
            <Button asChild className="bg-puprle-gradient bg-cover">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
