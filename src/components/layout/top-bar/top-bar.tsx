"use client";

import { Bell, CircleUser, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/actions/index";
import { toast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSession } from "@/redux/slices/employeeSlice";

export default function Topbar({ data }: any) {
  const dispatch = useDispatch();
  dispatch(setCurrentSession(data));

  const onSignOut = async () => {
    toast({
      description: "Logging out...",
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await signOut();
  };

  return (
    <div className="flex h-14 items-center gap-4 border-b bg-slate-100 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50">
      <div className="w-full justify-between flex place-items-center">
        <span className="text-lg">
          Welcome Back{" "}
          <span className="font-bold">
            {" "}
            {data.first_name} {data.last_name} !
          </span>
        </span>
        <div className="w-fit">
          <div className="w-fit relative">
            <span className="font-bold">
              {data.sectors ? data.sectors.sector_name : data.roles.role}
            </span>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              onSignOut();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
