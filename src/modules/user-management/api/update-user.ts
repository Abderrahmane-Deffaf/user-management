"use server";
import { baseUrl } from "@/lib/get-base-url";
import { revalidateTag } from "next/cache";

export async function updateUser(user: User) {
  try {
    const response = await fetch(`${baseUrl}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    revalidateTag("users");
    return data as User;
  } catch (error) {
    console.error("Error updating user:", error);
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred while updating the user.";
  }
}
