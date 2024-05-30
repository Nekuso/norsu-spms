"use client";

import { useSelector } from "react-redux";
import { FaHandHolding } from "react-icons/fa6";
import { PiKeyReturn } from "react-icons/pi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BsClockHistory } from "react-icons/bs";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

export default function Dashboard() {
  const currentSession = useSelector((state: any) => state.currentSession);

  return (
    <main className="flex h-full flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="h-full w-full flex flex-col">
        <div className=" grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
          <div className="card shadow rounded-xl p-6">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h4 className=" text-md font-semibold">Requests</h4>
                <div className="bg-indigo-600 bg-opacity-10 rounded-md w-10 h-10 flex items-center justify-center text-center text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-briefcase"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-0 text-base">
                <h2 className="text-3xl font-bold">78</h2>
              </div>
            </div>
          </div>
          <div className="card shadow rounded-xl p-6">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h4 className=" text-md font-semibold">Returns</h4>
                <div className="bg-indigo-600 bg-opacity-10 rounded-md w-10 h-10 flex items-center justify-center text-center text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-list"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-0 text-base">
                <h2 className="text-3xl font-bold">12</h2>
              </div>
            </div>
          </div>
          <div className="card shadow rounded-xl p-6">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h4 className=" text-md font-semibold">Approved</h4>
                <div className="bg-indigo-600 bg-opacity-10 rounded-md w-10 h-10 flex items-center justify-center text-center text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-check-circle"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-0 text-base">
                <h2 className="text-3xl font-bold">21</h2>
              </div>
            </div>
          </div>
          <div className="card shadow rounded-xl p-6">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h4 className=" text-md font-semibold">Pending</h4>
                <div className="bg-indigo-600 bg-opacity-10 rounded-md w-10 h-10 flex items-center justify-center text-center text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-target"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-0 text-base">
                <h2 className="text-3xl font-bold">26</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
