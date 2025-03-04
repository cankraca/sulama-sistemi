"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logInAction(
  formData: FormData
): Promise<string | null> { 
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(new URL("/api/login", "http://localhost:3000"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email, Sifre: password }),
  });

  const json = await response.json();

  if (response.ok) {
    cookies().set("Authorization", json.token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      path: "/",
      sameSite: "strict",
    });

    return null; 
  } else {
    return json.error || "Login failed"; 
  }
}
