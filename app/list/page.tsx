import DataTable from "~~/components/table";

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
