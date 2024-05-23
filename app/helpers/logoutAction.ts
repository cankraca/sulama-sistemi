"use server";

import { cookies } from "next/headers";

export default async function logOutAction() {
    try {
        cookies().set("Authorization", "", {
            secure: true,
            httpOnly: true,
            expires: new Date(0), // Immediate expiration
            path: "/",
            sameSite: "strict",
        });
    } catch (error) {
        console.error(error);
    }
}
