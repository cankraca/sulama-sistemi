import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const token = request.cookies.get("Authorization");

    if(!token) {
      return NextResponse.json({message: "Unauthorized token"}, {status: 401});
    }   
  
    const query = await executeQuery("SELECT * FROM vanalar");

    const data = JSON.stringify(query);

    return new NextResponse(data, {
        status: 200,
    });
}

export async function POST(request: NextRequest) {
    try {
        const { VanaModel, VanaCapi, BolgeID} = await request.json();
            
        await executeQuery("INSERT INTO vanalar (VanaModel, VanaCapi, BolgeID) VALUES (?,?,?)",[VanaModel, VanaCapi, BolgeID]);
    
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
      const {VanaID} = await request.json();
  
      await executeQuery("DELETE FROM vanalar WHERE VanaID = ?", [VanaID]);
  
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