import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SuperAdminList } from "./super-admin-list";
import { AddSuperAdminForm } from "./add-super-admin-form";

async function getSuperAdmins() {
  return await prisma.superAdmin.findMany({
    select: { id: true, username: true, isFirst: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function DashboardPage() {
  const superAdmins = await getSuperAdmins();
  const userCookie = cookies().get("user");
  const currentUser = JSON.parse(userCookie?.value || "{}");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Super Admins</h2>
        <SuperAdminList superAdmins={superAdmins} currentUser={currentUser} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Add New Super Admin</h2>
        <AddSuperAdminForm />
      </section>
    </div>
  );
}
