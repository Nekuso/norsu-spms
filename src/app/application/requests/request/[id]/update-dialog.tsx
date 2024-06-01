"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrNext } from "react-icons/gr";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useProgress } from "@/hooks/useProgress";

export default function UpdateStatus({ dataRequest }: any) {
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { updateProgress } = useProgress();

  const updateProgressSchema = z.object({
    id: z.coerce.number(),
  });

  const nextProgress = (progress: any) => {
    if (progress === "Pending") {
      return "Approve";
    }
    if (progress === "Approved") {
      return "Release";
    }
    if (progress === "Released") {
      return "Complete";
    }
  };

  const submitNextProgressData = (progress: any) => {
    if (progress === "Pending") {
      return "Approved";
    }
    if (progress === "Approved") {
      return "Released";
    }
    if (progress === "Released") {
      return "Completed";
    }
  };

  const form = useForm<z.infer<typeof updateProgressSchema>>({
    resolver: zodResolver(updateProgressSchema),
    defaultValues: {
      id: dataRequest.id,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await updateProgress(
        { ...data, status: submitNextProgressData(dataRequest.status) },
        1000
      );
      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️ Error",
          description: error.message,
        });
        return;
      }
      setDialogIsOpen(false);
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300"
          onClick={() => setDialogIsOpen(true)}
        >
          <span className="flex justify-center place-items-center gap-2">
            {nextProgress(dataRequest.status)} <GrNext />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]  border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>{nextProgress(dataRequest.status)}</DialogTitle>
          <DialogDescription>
            Are you sure you want to{" "}
            {nextProgress(dataRequest.status)?.toLowerCase()} this request?
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogFooter className="flex gap-4 justify-center place-items-center">
              <span
                className="text-xs font-bold text-muted-foreground cursor-pointer hover:underline transition-all duration-300"
                onClick={() => setDialogIsOpen(false)}
              >
                Cancel
              </span>

              <Button className="text-xs bg-applicationPrimary font-bold min-w-[100px] rounded-md flex gap-2 transition-all duration-300 hover:bg-applicationPrimary/70">
                <span
                  className={cn(
                    "flex gap-2 place-items-center justify-center",
                    {
                      hidden: isPending,
                    }
                  )}
                >
                  {nextProgress(dataRequest.status)}
                </span>
                <AiOutlineLoading3Quarters
                  className={cn(" animate-spin", { hidden: !isPending })}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
