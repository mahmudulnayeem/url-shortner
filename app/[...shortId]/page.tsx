import { redirect } from "next/navigation";
import { dbConnect } from "~~/lib/mongo";
import { Url } from "~~/model/url-model";

const ShortId = async ({ params }: { params: { shortId: string } }) => {
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
  if (entry?.redirectUrl) redirect(entry?.redirectUrl ?? "/");
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default ShortId;
