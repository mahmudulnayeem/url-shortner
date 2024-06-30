import { Metadata } from "next";
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
      <DataTable searchParams={searchParams} />
    </div>
  );
};

export default ListPage;
