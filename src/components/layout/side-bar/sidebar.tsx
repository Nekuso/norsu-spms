"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/login-logo.png";
import { sideLinks } from "./links";
import { Button } from "@/app/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { MdOutlineSupervisorAccount, MdSpaceDashboard } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { HiQueueList } from "react-icons/hi2";
import { AiOutlineStock } from "react-icons/ai";
import { LuBuilding } from "react-icons/lu";
import { FiActivity } from "react-icons/fi";
import { IoPrintOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { link } from "fs";
import { links } from "../nav-bar/links";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container2  h-screen animate-in">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <div
            style={{ marginLeft: isOpen ? "0px" : "0px" }}
            className="bars  pr-2
            pb-3"
          >
            <FaBars onClick={toggle} />
          </div>
          <div style={{ display: isOpen ? "block" : "" }}>
            <Image src={Logo} className="w-full logo" alt="Picture of Logo" />
          </div>
        </div>

        <div className="w-full h-full flex flex-col justify-between   gap-2 ">
          <div className="w-full flex flex-col gap-2   ">
            {sideLinks.map((link, i) => {
              const { title, href, Icon } = link;
              return (
                <Link
                  href={href}
                  className="w-full  px-2 flex justify-start items-center gap-3 p-2 link cursor-pointer   animate-in  text-white hover:bg-white hover:text-black transition duration-300 rounded-xl"
                  key={i}
                >
                  <div style={{ display: isOpen ? "block " : "none " }}>
                    <Icon className="text-2xl float-left" />
                    <span className="pl-1 text-lg font-bold float-right ">
                      {title}
                    </span>
                  </div>
                  <div style={{ display: !isOpen ? "block " : "none " }}>
                    <Icon className="text-2xl jsutify-center" />
                  </div>
                </Link>
              );
            })}
          </div>
          <Button className="w-full flex justify-start items-center gap-3 p-3 text-white bg-transparent hover:bg-white hover:text-black transition duration-300 rounded-xl text-lg">
            <CiLogout />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
