"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/home-logo.png";
import { useState } from "react";
import { links } from "./links";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(!false);

  return (
    <nav className="w-full h-auto py-2 md:py-4 flex justify-between place-items-start">
      <div className="w-[15%] max-md:w-[40%]">
        <Image src={Logo} alt="SAPSC Logo" className="w-full"></Image>
      </div>
      <div className="w-fit flex justify-center place-items-center gap-16 max-md:hidden">
        <ul className="w-full flex gap-8">
          {links.map((link, i) => {
            const { title, href } = link;
            return (
              <Link
                href={href}
                className="text-xs font-medium link"
                key={`b_${i}`}
              >
                {title}
              </Link>
            );
          })}
        </ul>

        {(isLoggedIn && (
          <Link
            href="/auth/login"
            className="w-fit h-fit px-6 py-3 bg-white text-black rounded-full font-bold text-xs hover: hover:bg-slate-200 transition duration-300 shadow-lg"
          >
            Login
          </Link>
        )) || (
          <Link
            href="/auth/login"
            className="w-fit h-fit px-6 py-3 bg-white text-black rounded-full font-bold text-xs hover: hover:bg-slate-200 transition duration-300 shadow-lg"
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
