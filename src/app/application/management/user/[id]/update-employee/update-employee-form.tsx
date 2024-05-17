"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import RoleInput from "./roles-input";
import SectorInput from "./sector-input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import ImageInput from "./image-input";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useEmployees } from "@/hooks/useEmployees";

export default function EmployeeForm({
  setDialogOpen,
  employee,
  roles,
  sectors,
}: any) {
  const [isPending, startTransition] = useTransition();
  const { updateEmployee } = useEmployees();

  const employeeSchema = z.object({
    id: z.string(),
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Must be a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    image_url: z.string().default("something"),
    address: z.string().min(1, { message: "Address is required" }),
    role: z
      .string()
      .min(1, { message: "Role is required" })
      .transform((arg) => new Number(arg)),
    sector: z
      .string()
      .transform((arg) => new Number(arg))
      .nullish(),
  });

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      password: employee.password,
      address: employee.address,
      role: employee.roles.id.toString(),
      sector: employee.sectors.id.toString(),
    },
  });

  async function onSubmit(data: z.infer<typeof employeeSchema>) {
    startTransition(async () => {
      const result = await updateEmployee(data, 4000);

      const { error } = JSON.parse(result);
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️ Error",
          description: error.message,
        });
        return;
      }
      setDialogOpen(false);
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex min-h-[300px] gap-6">
          <div className="w-full h-full flex flex-col gap-2">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageInput data={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg border-slate-600/50"
                          {...field}
                          type="text"
                          placeholder="Enter First Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex flex-col">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg border-slate-600/50"
                          {...field}
                          type="text"
                          placeholder="Enter Last Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg border-slate-600/50"
                          {...field}
                          type="text"
                          placeholder="example@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full h-full flex gap-4">
              <div className="w-full h-full flex flex-col">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Password</FormLabel>
                      <FormControl className="h-full">
                        <Input
                          className="rounded-lg border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-9"
                          type="text"
                          {...field}
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="bg-white/10" />
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Role</FormLabel>
                      <RoleInput data={field} rolesData={roles} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Sector</FormLabel>
                      <SectorInput data={field} form={form} sectors={sectors} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full h-full flex gap-4 place-items-end">
              <div className="w-full h-full flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="h-[82%]">
                      <FormLabel className="text-xs">Address</FormLabel>
                      <Textarea
                        className="border-slate-600/50 w-full h-full resize-none"
                        placeholder="Address"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-md min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Update User</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
