"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";
import { revalidatePath } from "next/cache";

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("../");
  }
  const id = session.user.id as string;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const deleteUser = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return { success: false };
  }

  try {
    await prisma.subscription.deleteMany({
      where: { userId },
    });

    await prisma.session.deleteMany({
      where: { userId },
    });

    await prisma.account.deleteMany({
      where: { userId },
    });

    await prisma.user.deleteMany({
      where: { id: userId },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return { success: false };
  }
};
