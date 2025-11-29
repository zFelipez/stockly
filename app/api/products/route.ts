import { db } from "@/app/_lib/prisma";


//apenas ára referencia 

export async function GET() {
  const products = await db.product.findMany({});

  return Response.json(products, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const name = body.name;
  const stock = body.stock;
  const price = body.price;

  await db.product.create({
    data: {
      name,
      stock,
      price,
    },
  });

  return Response.json({}, {status : 201} )
}
