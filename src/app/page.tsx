"use client";
import Image from "next/image";
import loginLogo from "../images/login-logo.png";
import loginIllustration from "../images/login-illustration.png";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [isClick, setisClick] = useState(false);
  const togglenav = (): void => {
    setisClick(!isClick);
  };
  return (
    <main className="w-screen h-screen  bg-[url('../images/wth4.jpg')] bg-cover bg-no-repeat flex  ">
      <div className="container  mx-auto h-full">
        <nav className="sticky waviy top-0 z-4 block w-full max-w-full px-4 py-2 text-white  rounded-none  h-max   lg:px-8 lg:py-4">
          <div className="flex   items-center  justify-between text-blue-gray-900">
            <div className="">
              <a
                href="#"
                className="mr-4     block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
              ></a>
            </div>
            <div className="flex nav backdrop-blur-3xl rounded-3xl  px-2  items-center gap-4">
              <div className=" hidden mr-4 md: lg:block">
                <ul className=" flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                  <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <a href="/app" className="flex items-center">
                      Home
                    </a>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <a href="#" className="flex items-center">
                      Pages
                    </a>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <a href="#" className="flex items-center">
                      About
                    </a>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <a href="#" className="flex items-center">
                      Docs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-x-1">
                <button
                  className="hidden rounded-full bg-white py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                >
                  <a href="/auth/SignIn">
                    <span>Login</span>
                  </a>
                </button>
              </div>
              <button
                className="fixed top-5 right-5 z-20 aria-pressed:true ml-auto h-26 max-h-[40px] w-23 max-w-[40px] select-auto rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                type="button"
                onClick={togglenav}
              >
                {isClick ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    stroke="white"
                    stroke-width="12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
          {isClick && (
            <div className="lg:hidden   text-center fixed top-0 right-0 bg-slate-400 w-2/4 h-full">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <ul className="  gap-4 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                  <div className=" ">
                    <div className=" px-4 pt-7 flex">
                      <li className="block  text-center hover:bg-slate-800 w-full p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <a href="#" className="flex items-center">
                          Home
                        </a>
                      </li>
                    </div>
                    <div className=" px-4">
                      <li className="block hover:bg-slate-800  w-full p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <a href="#" className="flex items-center">
                          Pages
                        </a>
                      </li>
                    </div>
                    <div className=" px-4">
                      <li className="block hover:bg-slate-800  w-full p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <a href="#" className="flex items-center">
                          About
                        </a>
                      </li>
                    </div>
                    <div className="flex items-center px-4">
                      <li className="block hover:bg-slate-800  w-full p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <a href="/SignIn" className="flex items-center">
                          Login
                        </a>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          )}
        </nav>

        <div className="flex flex-col justify-items-center place-items-center gap-2">
          <Image src={loginLogo} alt="norsu-logo" />
          <Image src={loginIllustration} alt="login-illustration" />
          <h1 className="text-center text-white text-3xl font-bold"></h1>
          <p className="text-center text-white text-xl"></p>
        </div>
      </div>
    </main>
  );
}
