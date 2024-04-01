import { MdSpaceDashboard } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { HiQueueList } from "react-icons/hi2";
import { AiOutlineStock } from "react-icons/ai";
import { LuBuilding } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { IoPrintOutline } from "react-icons/io5";

export const sideLinks = [
  {
    title: "Dashboard",
    href: "/application",
    Icon: MdSpaceDashboard,
  },
  {
    title: "Requests",
    href: "/application/request",
    Icon: VscGitPullRequestGoToChanges,
  },
  {
    title: "Stocks",
    href: "/application/stocks",
    Icon: HiQueueList,
  },
  {
    title: "Queue",
    href: "/application/queue",
    Icon: AiOutlineStock,
  },
  {
    title: "Departments",
    href: "/application/departments",
    Icon: LuBuilding,
  },
  {
    title: "Accounts",
    href: "/application/accounts",
    Icon: MdOutlineSupervisorAccount,
  },
  {
    title: "Activity Logs",
    href: "/application/activity",
    Icon: FiActivity,
  },
  {
    title: "Reports",
    href: "/application/report",
    Icon: IoPrintOutline,
  },
];
