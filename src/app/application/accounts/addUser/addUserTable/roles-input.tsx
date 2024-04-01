import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { FormControl } from "@/app/components/ui/form";

export default function SelectDemo({ data }: { data: any }) {
  const rolesData = [
    { id: 1, role: "Administrator" },
    { id: 2, role: "Manager" },
    { id: 3, role: "Staff" },
    { id: 4, role: "Cashier" },
    { id: 5, role: "Supervisor" },
    { id: 6, role: "Mechanic" },
  ];

  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg ">
          <SelectValue className="text-white" placeholder="Select a role" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {rolesData.map((role) => (
            <SelectItem key={role.id} value={role.role}>
              {role.role}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
