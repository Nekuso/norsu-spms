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

import OrderForm from "./add-proposal-form";
import { MdOutlineUploadFile } from "react-icons/md";

export default function ProposalDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-1   bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <MdOutlineUploadFile /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[370px] 2xl:max-w-[470px] bg-slate-200 border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Upload Proposal</DialogTitle>
          <DialogDescription>
            Upload a new supply proposal for this year
          </DialogDescription>
        </DialogHeader>
        <OrderForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
