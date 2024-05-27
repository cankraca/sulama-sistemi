import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';


export async function GET(request: NextRequest) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = request.cookies.get("Authorization");

    if(!token) {
        return NextResponse.json({message: "Unauthorized token"}, {status: 401});
    }
    const {payload} = await jose.jwtVerify(token.value, secret, {});

    const KullaniciID = payload.sub;  
  
    const query = await executeQuery("SELECT * FROM program WHERE KullaniciID = (?) ORDER BY ProgramID DESC LIMIT 1",[KullaniciID]);

    const data = JSON.stringify(query);

    return new NextResponse(data, {
        status: 200,
    });
}
export async function POST(request: NextRequest) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = request.cookies.get("Authorization");
    
        if(!token) {
            return NextResponse.json({message: "Unauthorized token"}, {status: 401});
        }
        const {payload} = await jose.jwtVerify(token.value, secret, {});
    
        const KullaniciID = payload.sub; 

        const { ProgramIcerik} = await request.json();
            
        await executeQuery("INSERT INTO program (ProgramIcerik, KullaniciID) VALUES (?, ?)",[ProgramIcerik, KullaniciID]);
    
        return NextResponse.json({message: "Data added successfully!"}, {status: 200, });

      } catch (error) {
        return NextResponse.json(
          { message: error },
          {
            status: 500,
          }
        );
      }
}
export async function DELETE(request: NextRequest) {
    try {
        const {ProgramID} = await request.json();
      
        await executeQuery("DELETE FROM program WHERE ProgramID NOT IN (SELECT * FROM (SELECT MAX(ProgramID) FROM program) AS max_program)", [ProgramID]);
      
        return NextResponse.json({message: "Data deleted!"}, {status: 200});
      
      } catch (error) {
        return NextResponse.json(
          { message: error },
          {
            status: 500,
          }
        );
      }
}
