"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ListPagination() {
  const router = useRouter();
  
  return (
    <Pagination
      onChange={(currentPage) => router.replace(`?page=${currentPage}`)}
      className="mx-auto w-fit mt-5"
      isCompact
      total={500}
      initialPage={1}
    />
  );
}
