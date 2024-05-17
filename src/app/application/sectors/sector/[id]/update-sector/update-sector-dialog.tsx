"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpdateEmployeeForm from "./update-sector-form";
import { MdOutlineModeEdit } from "react-icons/md";

export default function UpdateSectorDialog({ sector }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-lg flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary">
          <MdOutlineModeEdit />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]  Bg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update Sector</DialogTitle>
          <DialogDescription>
            Make sure to input the new correct fields of the sector
          </DialogDescription>
        </DialogHeader>
        <UpdateEmployeeForm
          setDialogOpen={setDialogIsOpen}
          dialogIsOpen={dialogIsOpen}
          sector={sector}
        />
      </DialogContent>
    </Dialog>
  );
}
