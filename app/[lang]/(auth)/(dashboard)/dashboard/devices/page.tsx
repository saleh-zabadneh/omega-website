import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeviceList } from "./device-list";
import { AddDeviceForm } from "./add-device-form";

export default async function DevicesPage() {
  const devices = await prisma.device.findMany({
    orderBy: { createdAt: "desc" },
  });

  const userCookie = cookies().get("user");
  const currentUser = JSON.parse(userCookie?.value || "{}");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Devices</h1>
      <Card>
        <CardHeader>
          <CardTitle>Device List</CardTitle>
          <CardDescription>A list of all registered devices.</CardDescription>
        </CardHeader>
        <CardContent>
          <DeviceList devices={devices} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Add New Device</CardTitle>
          <CardDescription>
            Enter the details of the new device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddDeviceForm />
        </CardContent>
      </Card>
    </div>
  );
}
