
import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try{
        const {Email, KullaniciAdi, Sifre, Sehir, Ilce} = await request.json();
        
        const hash = await bcrypt.hash(Sifre, 8);

        await executeQuery("INSERT INTO kullanici (Email, KullaniciAdi, Sifre, Sehir, Ilce) VALUES (?, ?, ?, ?, ?)",[Email, KullaniciAdi, hash, Sehir, Ilce]);

        return NextResponse.json({message: "Registered successfully!"}, {status: 200, });
    }
    catch (error) {
        return NextResponse.json({ message: error },{status: 500});
    }
}