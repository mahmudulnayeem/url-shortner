import { Metadata } from "next";
import Link from "next/link";
import DataTable from "~~/components/table";

export const metadata: Metadata = {
  title: "Mini URL Shortener | List",
};
const ListPage = ({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) => {
  return (
    <div className="p-2">
      <Link href="/list/1">details</Link>
      <DataTable searchParams={searchParams} />
    </div>
  );
};

export default ListPage;
