"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export async function readUserSession() {
  noStore();
  const supabsae = await createClient();
  return await supabsae.auth.getSession();
}

export const signOut = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
};

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const result = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
}
