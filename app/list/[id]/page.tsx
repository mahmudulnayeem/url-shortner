import { ArrowLeftIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import QrCode from "~~/components/qr-code";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~~/components/ui/table";
import { Url } from "~~/model/url-model";
import Chart from "../@modal/(..)list/[id]/Chart";
import { VisitType } from "../@modal/(..)list/[id]/page";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const url = await Url.findOne({ _id: params.id });
  return {
    title: `Mini URL Shortener - List | analytics-${url.shortId}`,
    description: `Mini URL Shortener - List | analytics-${url.redirectUrl}`,
  };
}
const DetailsPage = async ({ params }: { params: { id: string } }) => {
  const hostUrl = process.env.HOST_URL;
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
    <Card>
      <CardHeader className="px-7">
        <div className="flex gap-3 items-center">
          <Link href="/list">
            <ArrowLeftIcon className="cursor-pointer size-4 text-primary" />
          </Link>
          <CardTitle>Analytics of {url.redirectUrl}</CardTitle>
        </div>
        <CardDescription>
          Analytics of the generated short link.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 ">
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
        <div className="size-40">
          <QrCode value={`${hostUrl}/${url.shortId}`} />
        </div>

        {url.visitHistory.length > 0 && (
          <>
            <p className="font-bold text-lg">
              Page view using device analytics
            </p>
            <div className="mt-3 h-[30vh] w-full">
              <Chart data={chartData} />
            </div>
          </>
        )}
        <p className="font-bold text-lg">Visited History</p>
        {url.visitHistory.length === 0 ? (
          <div className="flex items-center justify-center flex-col h-full">
            <Image
              src="/not-found.svg"
              width={100}
              height={100}
              alt="No visit history recorded yet."
            />
            <p className="text-gray-500">No visit history recorded yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead className="table-cell">Device use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {url.visitHistory?.map((visit: VisitType) => (
                <TableRow key={visit._id} className="bg-accent">
                  <TableCell>
                    {new Date(visit.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="table-cell capitalize">
                    {visit.deviceType ?? "Unknown"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailsPage;
