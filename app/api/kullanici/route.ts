import { executeQuery } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
import * as jose from 'jose';

export async function GET(request: NextRequest) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = request.cookies.get("Authorization");


        if(!token) {
            return NextResponse.json({message: "Unauthorized token"}, {status: 401});
        }
        const {payload} = await jose.jwtVerify(token.value, secret, {});

        const KullaniciID = payload.sub;

        const query = await executeQuery("SELECT * FROM kullanici WHERE KullaniciID = ?", [KullaniciID]);
        const kullanici = query[0];

        if (!kullanici) {
            return NextResponse.json({message: "User not found"}, {status:404});
        }
        return NextResponse.json(kullanici, {status: 200});

    } catch (error) {
        return NextResponse.json({message: error}, {status: 401});
    }
}