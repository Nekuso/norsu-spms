"use client";
import { useState } from "react";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";

interface HeaderProps {
  headerOpen: boolean;
  setHeaderOpen: (arg: boolean) => void;
}
export default async function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return undefined;
  }
  return (
    <nav className=" sm:hidden bg-[#17134e]">
      <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-end">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center"></div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Logo
                </a>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="w-20 sm:hidden">
              <Dropdown
                showArrow
                radius="sm"
                classNames={{
                  content: "p-0 border-small border-divider bg-background",
                }}
              >
                <DropdownTrigger className="w-30   ">
                  <Button variant="ghost" disableRipple>
                    <div>
                      <div className=" rounded-lg px-4     left-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="round"
                        >
                          <line x1="3" y1="12" x2="21" y2="12"></line>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Custom item styles"
                  disabledKeys={["profile"]}
                  className="p-3  w-full h-full bg-blue"
                  itemClasses={{
                    base: [
                      "rounded-md",
                      "text-default-100",
                      "transition-opacity",
                      "data-[hover=true]:text-foreground",
                      "data-[hover=true]:bg-default-100",
                      "dark:data-[hover=true]:bg-default-50",
                      "data-[selectable=true]:focus:bg-default-50",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-default-500",

                      "",
                    ],
                  }}
                >
                  <DropdownSection
                    aria-label="Profile & Actions"
                    className="rounded-md"
                    showDivider
                  >
                    <DropdownItem
                      isReadOnly
                      key="profile"
                      className="h-14 gap-2 rounded-md   opacity-100"
                    >
                      <User
                        name="Adrian Cardosa"
                        description="@jrgarciadev"
                        classNames={{
                          name: "text-default-600",
                          description: "text-default-500",
                        }}
                      />
                    </DropdownItem>

                    <DropdownItem key="settings">
                      <div className="space-y-1 px-2 pb-3 pt-2">
                        <a
                          href="#"
                          className=" text-gray-600 hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium"
                          aria-current="page"
                        >
                          Dashboard
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                          Team
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                          Projects
                        </a>

                        <a
                          href="#"
                          className="text-gray-600 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        >
                          Logout
                        </a>
                      </div>
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection aria-label="Help & Feedback">
                    <DropdownItem key="help_and_feedback">
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" className="sm:hidden">
                      Log Out
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
            {/* <button onClick={toggleDropdown}>
              <svg
                className="h-6 w-6 px-4"
                fill=""
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="w-full pt-20 bg-white">
                <svg
                  className="h-6 w-6 px-4"
                  fill=""
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />{" "}
                </svg>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </div>
            )} */}
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu"></div>
    </nav>
  );
}
