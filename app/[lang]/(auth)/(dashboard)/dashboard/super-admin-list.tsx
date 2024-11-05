"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { deleteSuperAdmin, getPassword } from "./actions";

type SuperAdmin = {
  id: string;
  username: string;
  isFirst: boolean;
  createdAt: Date;
};

type SuperAdminListProps = {
  superAdmins: SuperAdmin[];
  currentUser: { id: string };
};

export function SuperAdminList({
  superAdmins: initialSuperAdmins,
  currentUser,
}: SuperAdminListProps) {
  const [superAdmins, setSuperAdmins] = useState(initialSuperAdmins);
  const [passwords, setPasswords] = useState<{ [key: string]: string | null }>(
    {}
  );

  const handleDelete = async (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    await deleteSuperAdmin(formData);
    setSuperAdmins(superAdmins.filter((admin) => admin.id !== id));
    toast({
      title: "Super Admin deleted",
      description: "The Super Admin has been successfully deleted.",
    });
  };

  const handleGetPassword = async (id: string) => {
    const password = await getPassword(id);
    setPasswords((prevPasswords) => ({ ...prevPasswords, [id]: password }));
  };

  const handleCopyPassword = (password: string | null) => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: "Password copied",
        description: "The password has been copied to your clipboard.",
      });
    } else {
      toast({
        title: "Error",
        description: "Unable to copy password. Password is not available.",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead>Password</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {superAdmins.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell>{admin.username}</TableCell>
            <TableCell>{new Date(admin.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              {admin.id !== currentUser.id && (
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(admin.id)}
                >
                  Delete
                </Button>
              )}
            </TableCell>
            <TableCell>
              {passwords[admin.id] !== undefined ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={passwords[admin.id] || ""}
                    readOnly
                  />
                  <Button
                    onClick={() => handleCopyPassword(passwords[admin.id])}
                  >
                    Copy
                  </Button>
                </div>
              ) : (
                <Button onClick={() => handleGetPassword(admin.id)}>
                  View Password
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
