import { baseUrl } from "@/lib/get-base-url";
import { userSearchParamsCache } from "./get-user-search-params";

export async function getAllUsers() {
  try {
    const { page, firstname, lastname, role } = userSearchParamsCache.all();
    const url = new URL(`${baseUrl}/users`);
    url.searchParams.append("firstname", firstname);
    url.searchParams.append("lastname", lastname);
    url.searchParams.append("page", page.toString());
    if (role === "admin" || role === "editor" || role === "viewer") {
      url.searchParams.append("role", role);
    }
    url.searchParams.append("limit", "10");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        tags: ["users"],
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format");
    }
    console.log("Fetched users:", data);
    return data as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred while fetching users.";
  }
}
