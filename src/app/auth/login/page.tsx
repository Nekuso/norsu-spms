"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInWithEmailAndPassword } from "@/lib/actions";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginBG from "@/images/login-bg.jpg";
import { Toaster } from "@/components/ui/toaster";
import Logo from "@/images/norsu-Logo.ico";
import Logo2 from "@/images/n1.jpg";
import { Toaster as Sonner } from "@/components/ui/sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function Login() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(data);

      const { error } = JSON.parse(result);
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      toast({
        description: "Login successful",
      });
      return redirect("/application");
    });
  }

  return (
    <div className="w-full h-screen flex justify-center place-items-center lg:grid lg:grid-cols-1 bg-blue-900 relative">
      <div className="w-[1100px] border shadow-xl h-[700px] flex place-items-center justify-center rounded-2xl overflow-hidden bg-white">
        <div className="mx-auto grid w-fit gap-4 p-8">
          <div className="w-full flex justify-center">
            <Image
              src={Logo}
              alt="Image"
              className="w-[60%] object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-balance text-black ">
              Enter your email and password below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form
              className="flex flex-col w-full gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-col w-full gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Email</FormLabel>
                        <FormControl>
                          <input
                            title="email"
                            type="text"
                            placeholder="Enter your email"
                            className="w-full text-sm px-2.5 py-2.5 rounded-md bg-foregroundBg text-black border border-lightBorder "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Password</FormLabel>
                        <FormControl>
                          <input
                            type="password"
                            placeholder="••••••••••"
                            className="w-full text-sm px-2.5 py-2.5 rounded-md bg-foregroundBg text-black border border-lightBorder "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                <span className={cn({ hidden: isPending })}>Login</span>
                <AiOutlineLoading3Quarters
                  className={cn(" animate-spin", { hidden: !isPending })}
                />
              </Button>
            </form>
          </Form>
        </div>
        <Image
          src={Logo2}
          alt="Image"
          className="w-[60%] h-full opacity-85 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <Sonner />
      <Toaster />
    </div>
  );
}
