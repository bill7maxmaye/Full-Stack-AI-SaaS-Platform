import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/sidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Rootlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <Sidebar />

      {/* Mobile Navigation and Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Nav Header */}
        <div className="lg:hidden p-4 border-b flex justify-between items-center">
          <MobileNav />
          <Link href="/" className="flex items-center">
            <Image src="/logo.webp" width={40} height={40} alt="Logo" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </main>
  );
};

export default Rootlayout;
