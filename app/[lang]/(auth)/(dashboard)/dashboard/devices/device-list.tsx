"use client";

import { useState } from "react";
import { deleteDevice } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Device = {
  id: string;
  name: string;
  url: string;
  customerName: string;
};

type DeviceListProps = {
  devices: Device[];
};

export function DeviceList({ devices: initialDevices }: DeviceListProps) {
  const [devices, setDevices] = useState(initialDevices);

  const handleDelete = async (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    await deleteDevice(formData);
    setDevices(devices.filter((device) => device.id !== id));
  };

  return (
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
              <Button
                variant="destructive"
                onClick={() => handleDelete(device.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
