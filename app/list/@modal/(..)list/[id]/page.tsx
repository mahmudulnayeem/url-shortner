import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "~~/app/list/@modal/modal";
import QrCode from "~~/components/qr-code";
import { ScrollArea } from "~~/components/ui/scroll-area";
import { dbConnect } from "~~/lib/mongo";
import { Url } from "~~/model/url-model";
import Chart from "./Chart";

const Analytics = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const hostUrl = process.env.HOST_URL;
  await dbConnect();
  const url = await Url.findOne({ _id: params.id });
  const chartData = [];

  if (url.visitHistory.length > 0) {
    const deviceType = url.visitHistory.map(
      (visit: VisitType) => visit.deviceType
    );
    const deviceTypeCount = deviceType.reduce((acc: any, curr: any) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    const data = Object.keys(deviceTypeCount).map((key) => ({
      name: key === "undefined" ? "Unknown" : key,
      value: deviceTypeCount[key],
      fill:
        key === "desktop"
          ? "#FFC107"
          : key === "mobile"
          ? "#00BCD4"
          : "#4CAF50",
    }));
    chartData.push(...data);
  }

  return (
    <Modal title={`Analytics of ${url.redirectUrl}`}>
      <ScrollArea className=" h-[90vh] ">
        <div className="flex flex-col space-y-4">
          <p className="flex items-center gap-2">
            {" "}
            <span className="text-nowrap"> Original Url : </span>
            <Link
              title={url.redirectUrl}
              href={url.redirectUrl}
              className="flex items-center hover:text-primary truncate"
            >
              {url.redirectUrl}{" "}
              <ArrowTopRightIcon className="cursor-pointer size-4 " />
            </Link>{" "}
          </p>
          <p className="flex items-center gap-2">
            {" "}
            Generated Short id :{" "}
            <Link
              title={url.shortId}
              href={`${hostUrl}/${url.shortId}`}
              className="flex items-center hover:text-primary"
            >
              {url.shortId}{" "}
              <ArrowTopRightIcon className="cursor-pointer size-4 " />
            </Link>{" "}
          </p>
          <p className="flex items-center gap-2 ">
            {" "}
            <span className="text-nowrap"> generated Short Url : </span>
            <Link
              title={`${hostUrl}/${url.shortId}`}
              href={`${hostUrl}/${url.shortId}`}
              className="flex items-center hover:text-primary truncate"
            >
              {hostUrl}/{url.shortId}
              <ArrowTopRightIcon className="cursor-pointer size-4 " />
            </Link>{" "}
          </p>
          <div className="size-40 my-4">
            <QrCode value={`${hostUrl}/${url.shortId}`} />
          </div>
          <p className="font-bold text-sm sm:text-lg text-left">
            Page view using device analytics
          </p>
          <div className="mt-3 h-[25vh] w-3/4">
            <Chart data={chartData} />
          </div>
          <p className="font-bold text-sm sm:text-lg text-left">
            Visited History
          </p>
          {url.visitHistory.length === 0 ? (
            <div className="flex items-center justify-center flex-col">
              <Image
                src="/not-found.svg"
                width={100}
                height={100}
                alt="No visit history recorded yet."
              />
              <p className="text-gray-500">No visit history recorded yet.</p>
            </div>
          ) : (
            <ScrollArea className="h-[40vh]">
              <div className="flex flex-col space-y-4">
                {url.visitHistory.map((visit: VisitType) => (
                  <div key={visit._id} className="flex flex-col space-y-2">
                    <p className="flex items-center gap-2">
                      {" "}
                      <span className="text-nowrap"> Timestamp : </span>
                      <span>
                        {new Date(visit.timestamp).toLocaleString()}
                      </span>{" "}
                    </p>
                    <p className="flex items-center gap-2">
                      {" "}
                      <span className="text-nowrap"> Visit using : </span>
                      <span>
                        {visit.deviceType ?? "Unknown device type"}
                      </span>{" "}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </ScrollArea>
    </Modal>
  );
};

export default Analytics;

export type VisitType = {
  timestamp: number;
  deviceType: string;
  _id: string;
};
