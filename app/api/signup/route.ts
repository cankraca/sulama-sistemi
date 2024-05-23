import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try{
        const {Email, KullaniciAdi, Sifre} = await request.json();

        // if (!validateEmail(Email) || !validatePassword(Sifre)) {
        //     return NextResponse.json({error: "Invalid email or password"}, {status:400});
        // }

        const hash = bcrypt.hash(Sifre, 8);

        await executeQuery("INSERT INTO kullanici (Email, KullaniciAdi, Sifre) VALUES (?, ?, ?)",[Email, KullaniciAdi, hash]);

        return NextResponse.json({message: "Registered successfully!"}, {status: 200, });
    }
    catch (error) {
        return NextResponse.json({ message: error },{status: 500});
    }
}