"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logInAction(
  currentState: any,
  formData: FormData
): Promise<string> {
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

  cookies().set("Authorization", json.token, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 3, //3 days
    path: "/",
    sameSite: "strict",
  });

  if (response.ok) {
    redirect("/anasayfa");
  } else {
    return json.error;
  }
}
