import { Metadata } from "next";
import { redirect } from "next/navigation";
import { dbConnect } from "~~/lib/mongo";
import { Url } from "~~/model/url-model";
export const metadata: Metadata = {
  title: "Mini URL Shortener | Redirecting...",
};

const ShortId = async ({
  params,
  searchParams,
}: {
  params: { shortId: string };
  searchParams: {
    // setting the viewport in middleware.ts
    viewport: string;
  };
}) => {
  const { shortId } = params;
  await dbConnect();

  const entry = await Url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
          deviceType: searchParams?.viewport ?? "",
        },
      },
    }
  );
  if (entry?.redirectUrl) redirect(entry?.redirectUrl ?? "/");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[url('/icon.png')] bg-left bg-contain bg-no-repeat bg-opacity-10 ">
      <div>
        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold text-gray-800">URL Shortener</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-800">Redirecting...</div>
        </div>
      </div>
    </div>
  );
};

export default ShortId;
