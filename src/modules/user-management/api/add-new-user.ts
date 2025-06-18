"use server";
import { baseUrl } from "@/lib/get-base-url";
import { revalidateTag } from "next/cache";

export async function addNewUser(user: Omit<User, "id">) {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to add new user");
    }

    const data = await response.json();
    console.log("New user added:", data);
    revalidateTag("users");

    return data as User;
  } catch (error) {
    console.error("Error adding new user:", error);
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred while adding the user.";
  }
}
