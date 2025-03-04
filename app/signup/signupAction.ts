"use server";

import { redirect } from "next/navigation";

export default async function signUpAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");

  const response = await fetch(
    new URL("/api/signup", "http://localhost:3000"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        KullaniciAdi: username,
        Sifre: password,
      }),
    }
  );

  const json = await response.json();
  console.log(json);

  if (response.ok) {
    redirect("/login");
  } else {
    return json.error;
  }
}
