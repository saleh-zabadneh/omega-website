import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { addDevice, deleteDevice } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.url}</TableCell>
                  <TableCell>{device.customerName}</TableCell>
                  <TableCell>
                    {currentUser.isFirst && (
                      <form action={deleteDevice}>
                        <input type="hidden" name="id" value={device.id} />
                        <Button variant="destructive" type="submit">
                          Delete
                        </Button>
                      </form>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
          <form action={addDevice} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Device Name</Label>
              <Input type="text" id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Device URL</Label>
              <Input type="url" id="url" name="url" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                type="text"
                id="customerName"
                name="customerName"
                required
              />
            </div>
            <Button type="submit">Add Device</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
