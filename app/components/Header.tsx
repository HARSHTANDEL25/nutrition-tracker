"use client";
import Link from "next/link";
import { navLinks } from "../data/header";
import { useState } from "react";
import { SettingsIcon, SproutIcon } from "@/public/svgs/svgs";

const Header = () => {
  const [ActiveLink, SetActiveLink] = useState("");
  return (
    <header className="w-full py-12 bg-[linear-gradient(135deg,#e8f5e9_0%,#f0fdf4_40%,#ecfeff_70%,#f0f9ff_100%)]">
      <nav
        className="max-w-[1440px] mx-auto h-16 flex justify-between items-center px-6 border border-white/85  bg-white/60 backdrop-blur-[20px] border-b border-b-emerald-500/15
      shadow-[inset_0_1px_0_0_rgba(16,185,129,0.12),0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] rounded-2xl
      "
      >
        <Link href="/" className="flex items-center gap-2.5">
          <SproutIcon />
          <span className="font-outfit text-[18px] font-bold tracking-tight text-gray-900 leading-none">
            Nutri<span className="text-emerald-500">Log</span>
          </span>
        </Link>
        <div className="flex gap-10">
          {navLinks.map((link, index) => {
            return (
              <Link
                href={link.href}
                key={index}
                onClick={() => SetActiveLink(link.name)}
                className={
                  ActiveLink === link.name
                    ? "text-emerald-500 border-b-2 border-b-emerald-500"
                    : "text-gray-500"
                }
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-5">
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg cursor-pointer">
            + Quick add
          </button>
          <button className="cursor-pointer">
            <SettingsIcon />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
