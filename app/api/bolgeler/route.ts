import { executeQuery } from "../../lib/db";

export async function GET() {
    const query = await executeQuery("SELECT * FROM bolgeler");

    const data = JSON.stringify(query);

    return new Response(data, {
        status: 200,
    });
};

export async function POST(request : Request) {
    try {
        const { BolgeAdi, BolgeResmi, ResimAdi, Renk} = await request.json();
            
        await executeQuery("INSERT INTO bolgeler (BolgeAdi, BolgeResmi, ResimAdi, Renk, OlusturulmaTarihi) VALUES (?, ?, ?, ?, LOCALTIME())",[BolgeAdi,BolgeResmi,ResimAdi,Renk]);
    
        return Response.json({message: "Data added successfully!"}, {status: 200, });

      } catch (error) {
        return Response.json(
          { message: error },
          {
            status: 500,
          }
        );
      }
}

export async function DELETE(request: Request) {
try {
  const {BolgeID} = await request.json();

  await executeQuery("DELETE FROM bolgeler WHERE BolgeID = ?", [BolgeID]);

  return Response.json({message: "Data deleted!"}, {status: 200});

} catch (error) {
  return Response.json(
    { message: error },
    {
      status: 500,
    }
  );
}
}

export async function PUT() {}