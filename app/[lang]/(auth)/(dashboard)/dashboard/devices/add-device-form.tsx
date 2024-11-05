"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDevice } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddDeviceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    await addDevice(formData);

    setIsSubmitting(false);
    router.refresh();
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Input type="text" id="customerName" name="customerName" required />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Device"}
      </Button>
    </form>
  );
}
