import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "~~/lib/mongo";
import { Url } from "~~/model/url-model";
export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url) {
    return new NextResponse("Please provide a URL", {
      status: 400,
    });
  }

  const shortId = nanoid(8);

  await dbConnect();

  await Url.create({
    shortId,
    redirectUrl: url,
    visitHistory: [],
  });

  return new NextResponse(JSON.stringify({ id: shortId }), {
    status: 201,
    statusText: "Short url created",
  });
}
