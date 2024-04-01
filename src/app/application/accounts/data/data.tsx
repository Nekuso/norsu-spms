import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { CiDeliveryTruck } from "react-icons/ci";
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FcProcess } from "react-icons/fc";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "rejected",
    label: "rejected",
    icon: FcCancel,
  },
  {
    value: "pending",
    label: "pending ",
    icon: FcProcess,
  },

  {
    value: "approved",
    label: "approved",
    icon: FcApproval,
  },
];

export const priorities = [
  {
    label: "January-12,2024",
    value: "January-12,2024",
    icon: ArrowDownIcon,
  },
  {
    label: "January 15,2024",
    value: "January 15,2024",
    icon: ArrowRightIcon,
  },
  {
    label: "May 12,2024",
    value: "May 12,2024",
    icon: ArrowUpIcon,
  },
];

export const modes = [
  {
    label: "pick-up",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "drop-off",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const departments = [
  {
    label: "It",
    value: "It",
  },
  {
    label: "Education",
    value: "Education",
  },
];

export const kinds = [
  {
    label: "request",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "return",
    value: "high",
    icon: ArrowUpIcon,
  },
];
