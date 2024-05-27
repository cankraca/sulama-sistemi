import { NextRequest,NextResponse } from "next/server";
import { executeQuery } from "../../lib/db";
import * as jose from 'jose';


export async function GET(request: NextRequest) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = request.cookies.get("Authorization");

    if(!token) {
        return NextResponse.json({message: "Unauthorized token"}, {status: 401});
    }
    const {payload} = await jose.jwtVerify(token.value, secret, {});

    const KullaniciID = payload.sub;

    const query = await executeQuery("SELECT * FROM bolgeler WHERE KullaniciID = (?)",[KullaniciID]);

    const data = JSON.stringify(query);

    return new NextResponse(data, {
        status: 200,
    });
};

export async function POST(request : NextRequest) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = request.cookies.get("Authorization");
    
        if(!token) {
            return NextResponse.json({message: "Unauthorized token"}, {status: 401});
        }
        const {payload} = await jose.jwtVerify(token.value, secret, {});
    
        const KullaniciID = payload.sub;

        const { BolgeAdi, BolgeResmi, Renk} = await request.json();
            
        await executeQuery("INSERT INTO bolgeler (BolgeAdi, BolgeResmi, Renk, OlusturulmaTarihi, KullaniciID) VALUES (?, ?, ?, LOCALTIME(), ?)",[BolgeAdi,BolgeResmi,Renk,KullaniciID]);
    
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
    const {BolgeID} = await request.json();

    await executeQuery("DELETE FROM bolgeler WHERE BolgeID = ?", [BolgeID]);

    return NextResponse.json({message: "Data deleted!"}, {status: 200});

} catch (error) {
    return NextResponse.json({ message: error },{status: 500});
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {BolgeAdi, BolgeID} = await request.json();

    await executeQuery("UPDATE bolgeler SET BolgeAdi = ? WHERE BolgeID = ?",[BolgeAdi,BolgeID]);

    return NextResponse.json({message: "Data updated!"}, {status: 200});

  } catch (error) {
    return NextResponse.json({message: error}, {status: 500})
  }
  
}