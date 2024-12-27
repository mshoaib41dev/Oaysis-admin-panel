"use server";
import { BASE_URL } from "@/features/libs/utils/config";
import { cookies } from "next/headers";

const getAccessToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    return token ? token.value : null;
  } catch (error) {
    console.error("Failed to get access token:", error);
    return null;
  }
};

export const getAllUser = async (page?: number, itemsPerPage?: number) => {
  const token = await getAccessToken();
  if (!token) {
    console.error("Access token is not available.");
    return null;
  }

  // let url = `${BASE_URL}/api/user/getallusers/`;
  let url = `${BASE_URL}/api/admin/allUsers/`;
  console.log("ApI URL", url);

  if (page || itemsPerPage) {
    // url += `?page=${page}&page_size=${itemsPerPage}`;
    url += `?page=1&page_size=15`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Api Users Data", data.users.results[0].profiles);

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const getPostsByID = async (id: string) => {
  const token = await getAccessToken();
  if (!token) {
    console.error("Access token is not available.");
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/admin/userPosts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
};
