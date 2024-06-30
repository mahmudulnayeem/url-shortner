import { ArrowLeftIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { dbConnect } from "~~/lib/mongo";
import { Url } from "~~/model/url-model";
import CopyButton from "./copy-button";
import Pagination from "./pagination";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default async function DataTable({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = parseInt(searchParams?.page ?? "1");
  await dbConnect();
  const data = await Url.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .skip((page - 1) * 10)
    .exec();

  const totalData = await Url.find().countDocuments();
  const hostUrl = process.env.HOST_URL;
  return (
    <Card>
      <CardHeader className="px-7">
        <div className="flex gap-3 items-center">
          <Link href="/">
            <ArrowLeftIcon className="cursor-pointer size-4 text-primary" />
          </Link>
          <CardTitle>Recent Links</CardTitle>
        </div>
        <CardDescription>Recent generated short link.</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Long URL</TableHead>
              <TableHead className="table-cell">Short URL</TableHead>
              <TableHead className="table-cell">Total Clicks</TableHead>
              <TableHead className="table-cell">Analytics</TableHead>
              <TableHead className="table-cell">Create Date</TableHead>
              <TableHead className="text-right">Copy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((url) => (
              <TableRow key={url._id} className="bg-accent">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{url.redirectUrl}</span>
                    {new Date(url.createdAt) >
                      new Date(
                        new Date().setDate(new Date().getDate() - 1)
                      ) && <Badge className="text-xs">New</Badge>}
                  </div>
                </TableCell>
                <TableCell className="table-cell">
                  <Link
                    href={`${hostUrl}/${url.shortId}`}
                    target="_blank"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <span className="text-xs">
                      {`${hostUrl}/${url.shortId}`}
                    </span>
                    <ArrowTopRightIcon className="cursor-pointer size-4 " />
                  </Link>
                </TableCell>
                <TableCell className="table-cell">
                  {url.visitHistory.length}
                </TableCell>
                <TableCell className="table-cell">
                  <Link href={`/list/${url._id}`}>Click to view</Link>
                </TableCell>
                <TableCell className="table-cell">
                  {new Date(url.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="flex  justify-end">
                  <CopyButton url={`${hostUrl}/${url.shortId}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-5">
          <Pagination totalElements={totalData} />
        </div>
      </CardContent>
    </Card>
  );
}
