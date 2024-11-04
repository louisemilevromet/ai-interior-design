"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/lib/actionsUser";

const DashboardPage = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleDeleteUser = async () => {
    await deleteUser();
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
      <Button onClick={handleDeleteUser}>Delete User</Button>
    </div>
  );
};

export default DashboardPage;
