"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const lang = (formData.get("lang") as string) || "en";

  console.log("Attempting login for username:", username);

  const user = await prisma.superAdmin.findUnique({ where: { username } });

  if (!user) {
    console.log("User not found");
    return { error: "Invalid username or password" };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    console.log("Invalid password");
    return { error: "Invalid username or password" };
  }

  console.log("Login successful");

  const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  cookies().set(
    "user",
    JSON.stringify({
      id: user.id,
      username: user.username,
      isFirst: user.isFirst,
      expiresAt: expirationTime.toISOString(),
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expirationTime,
    }
  );

  return { success: true, lang };
}
