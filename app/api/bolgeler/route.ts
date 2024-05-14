import { NextRequest,NextResponse } from "next/server";
import { executeQuery } from "../../lib/db";

export async function GET() {
    const query = await executeQuery("SELECT * FROM bolgeler");

    const data = JSON.stringify(query);

    return new NextResponse(data, {
        status: 200,
    });
};

export async function POST(request : NextRequest) {
    try {
        const { BolgeAdi, BolgeResmi, Renk} = await request.json();
            
        await executeQuery("INSERT INTO bolgeler (BolgeAdi, BolgeResmi, Renk, OlusturulmaTarihi) VALUES (?, ?, ?, ?, LOCALTIME())",[BolgeAdi,BolgeResmi,Renk]);
    
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