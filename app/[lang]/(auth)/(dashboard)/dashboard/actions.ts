"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSuperAdmin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  await prisma.superAdmin.create({
    data: {
      username,
      password, // Store the original password
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteSuperAdmin(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.superAdmin.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
}

export async function logout() {
  cookies().delete("user");
  redirect("/login");
}

export async function getPassword(id: string) {
  const user = await prisma.superAdmin.findUnique({
    where: { id },
    select: { password: true },
  });

  if (user) {
    return user.password; // Return the original password
  }

  return null;
}
