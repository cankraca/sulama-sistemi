import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jose from 'jose'


export async function POST(request: NextRequest) {
    try {
        const {Email, Sifre} = await request.json();

    // if(!validateEmail(Email) || !validatePassword(Sifre)){
    //     return NextResponse.json({error: "Invalid email or password"}, {status:400});
    // }

    const user = await executeQuery("SELECT * FROM kullanici WHERE Email = ?", [Email])

    if(!user) {
        return NextResponse.json({error: "E-posta Bulunamadı"}, {status:400});
    }

    const isCorrectPassword = bcrypt.compare(Sifre, user[0].Sifre);

    if(!isCorrectPassword) {
        return NextResponse.json({error: "Şifre Yanlış!"}, {status:400});
    }
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';
      
    const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .setSubject(user[0].KullaniciID.toString())
        .sign(secret);

    return NextResponse.json({token: jwt});
    } catch (error) {
        return NextResponse.json({ message: error },{status: 500});
    }
}