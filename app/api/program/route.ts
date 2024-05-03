import { executeQuery } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const query = await executeQuery("SELECT ProgramIcerik FROM program");

    const data = JSON.stringify(query);

    return new NextResponse(data, {
        status: 200,
    });
}
export async function POST(request: NextRequest) {
    try {
        const { ProgramIcerik} = await request.json();
            
        await executeQuery("INSERT INTO program (ProgramIcerik) VALUES (?)",[ProgramIcerik]);
    
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
      
        await executeQuery("DELETE FROM program WHERE ProgramID = ?", [ProgramID]);
      
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
