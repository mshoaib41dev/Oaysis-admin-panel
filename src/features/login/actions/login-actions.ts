"use server";
import { BASE_URL } from "@/features/libs/utils/config";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  try {
    // const response = await fetch(`${BASE_URL}/api/user/login/`, {
    const response = await fetch(`${BASE_URL}/api/admin/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      return { success: false, message: errorData?.message || "Login failed" };
    }

    const data = await response.json();
    console.log("Response data:", data?.token?.access);

    if (data?.token?.access) {
      const cookieJar = await cookies();
      cookieJar.set("token", data?.token?.access);

      revalidatePath("/dashboard");

      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login." };
  }
};

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

export const logoutUser = async () => {
  const token = await getAccessToken();

  if (!token) {
    console.error("Access Token Expired");
    return null;
  }

  if (token) {
    const cookieJar = cookies();
    (await cookieJar).delete("token");
    return { success: true, message: "User Logout Sussessfully" };
  } else {
    return { success: false, message: "User Logout Failed" };
  }
};
