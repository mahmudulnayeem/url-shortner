import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { dbConnect } from "~~/lib/mongo";
import { Url } from "~~/model/url-model";
export async function GET(
  request: NextRequest,
  { params }: { params: { shortId: string } }
) {
  const { shortId } = params;

  await dbConnect();

  const entry = await Url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  redirect(entry?.redirectUrl ?? "/");
}
