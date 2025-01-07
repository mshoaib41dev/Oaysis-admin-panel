"use server";
import { BASE_URL } from "@/features/libs/utils/config";
import { cookies } from "next/headers";
import { console } from "node:inspector/promises";

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

export const getAllfeedback = async (
  page?: number,
  itemsPerPage?: number,
  feedback_status?: string
) => {
  const token = await getAccessToken();
  if (!token) {
    console.error("Access token is not available.");
    return null;
  }

  let url = `${BASE_URL}/api/admin/feedback/`;

  if (feedback_status) {
    url += `?feedback_status=${feedback_status}`;
    console.log("Constructed URL:", url);
  }

  if (page || itemsPerPage) {
    url += `&page=${page || 1}&page_size=${itemsPerPage || 15}`;
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
    return data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }
};

const updateFeedback = async (payload: {
  feedback_id: string;
  feedback_status: string;
}) => {
  const token = await getAccessToken();
  if (!token) {
    console.error("Access token is not available.");
    return null;
  }

  console.log("Payload", payload);

  try {
    const response = await fetch(`${BASE_URL}/api/admin/updateFeedback/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response---------", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating feedback:", error);
    return error;
  }
};

export { updateFeedback };
