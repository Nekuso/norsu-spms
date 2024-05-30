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

import OrderForm from "./add-request-form";
import { BsBoxSeam } from "react-icons/bs";

export default function SuppliesDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <BsBoxSeam /> Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1170px] 2xl:max-w-[1570px] bg-slate-200 border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Request</DialogTitle>
          <DialogDescription>
            Fill out the form to request supplies
          </DialogDescription>
        </DialogHeader>
        <OrderForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
