import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~~/components/ui/card";
import { Skeleton } from "~~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~~/components/ui/table";
import { cn } from "~~/lib/utils";

const ListLoading = () => {
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
              <TableHead className="table-cell">Create Date</TableHead>
              <TableHead className="text-right">Copy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i} className="bg-accent">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">
                      <Skeleton
                        className={cn("w-40 h-3", i % 2 === 0 && "w-48")}
                      />
                    </span>
                  </div>
                </TableCell>
                <TableCell className="table-cell">
                  <Skeleton className={cn("w-40 h-3", i % 2 === 0 && "w-36")} />
                </TableCell>
                <TableCell className="table-cell">
                  <Skeleton className="w-10 h-4" />
                </TableCell>
                <TableCell className="table-cell">
                  <Skeleton className="w-40 h-3" />
                </TableCell>
                <TableCell className="flex  justify-end">
                  <Skeleton className="w-24 h-10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-5">
          <Skeleton className="w-48 h-5" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ListLoading;
