"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSuperAdmin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.superAdmin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteSuperAdmin(formData: FormData) {
  const id = formData.get("id") as string;

  const userCookie = cookies().get("user");
  const currentUser = JSON.parse(userCookie?.value || "{}");

  if (currentUser.isFirst) {
    await prisma.superAdmin.delete({
      where: { id },
    });
  }

  revalidatePath("/dashboard");
}

export async function logout() {
  cookies().delete("user");
  redirect("/login");
}

export async function getPassword(id: string) {
  const userCookie = cookies().get("user");
  const currentUser = JSON.parse(userCookie?.value || "{}");

  if (currentUser.isFirst) {
    const user = await prisma.superAdmin.findUnique({
      where: { id },
      select: { password: true },
    });

    if (user) {
      return user.password;
    }
  }

  return null;
}
