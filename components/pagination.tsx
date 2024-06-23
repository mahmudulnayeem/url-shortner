"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "./ui/button";

const Pagination = ({ totalElements }: { totalElements: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = parseInt(searchParams.get("page") ?? "1");
  const totalPages = Math.ceil(totalElements / 10);

  const handlePageChange = useCallback(
    (pageNumber: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <div className="flex items-center justify-center gap-2 text-primary">
        <Button
          disabled={currentPage === 1}
          onClick={() =>
            router.push(
              `${pathname}?${handlePageChange((currentPage - 1).toString())}`
            )
          }
          variant="ghost"
          className="text-primary disabled:cursor-not-allowed"
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <span>
            {currentPage} / {totalPages}
          </span>
        </div>
        <Button
          onClick={() =>
            router.push(
              `${pathname}?${handlePageChange((currentPage + 1).toString())}`
            )
          }
          disabled={currentPage === totalPages}
          variant="ghost"
          className="text-primary disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
