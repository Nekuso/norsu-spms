import {
  Home,
  ShoppingCart,
  Package,
  Building,
  FileUp,
  User,
  File,
  CornerDownLeft,
} from "lucide-react";
export const links = [
  {
    href: "/application",
    icon: Home,
    label: "Dashboard",
  },
  {
    href: "/application/requests",
    icon: ShoppingCart,
    label: "Requests",
  },
  {
    href: "/application/returns",
    icon: CornerDownLeft,
    label: "Returns",
  },
  {
    href: "/application/main_supplies",
    icon: Package,
    label: "Main Supplies",
  },
  {
    href: "/application/sectors",
    icon: Building,
    label: "Sectors",
  },
  {
    href: "/application/management",
    icon: User,
    label: "Management",
  },
  {
    href: "/application/restock_reports",
    icon: File,
    label: "Restock Reports",
  },
  {
    href: "/application/supplies",
    icon: Package,
    label: "Supplies",
  },
  {
    href: "/application/proposals",
    icon: FileUp,
    label: "Supply Proposal",
  },
];
