import { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

import EmployeeForm from "./add-employee-form";

export default function EmployeesDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg flex gap-2">
          <IoPersonAddOutline /> New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-darkComponentBg border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>
            Add a new user with level role access
          </DialogDescription>
        </DialogHeader>
        <EmployeeForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
