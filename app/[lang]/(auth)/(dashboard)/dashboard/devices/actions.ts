"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addDevice(formData: FormData) {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const customerName = formData.get("customerName") as string;

  await prisma.device.create({
    data: {
      name,
      url,
      customerName,
    },
  });

  revalidatePath("/dashboard/devices");
}

export async function deleteDevice(formData: FormData) {
  const id = formData.get("id") as string;

  const userCookie = cookies().get("user");
  const currentUser = JSON.parse(userCookie?.value || "{}");

  if (currentUser.isFirst) {
    await prisma.device.delete({
      where: { id },
    });
  }

  revalidatePath("/dashboard/devices");
}
