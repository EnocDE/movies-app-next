"use client";
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function ListPagination() {
  const params = useSearchParams()
  const router = useRouter();
  const pathname = usePathname()
  
  const handleChangePage = (selectedPage: number) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get("page")) {
      searchParams.set("page", selectedPage.toString())
    } else {
      searchParams.append("page", selectedPage.toString())
    }
    
    router.replace(`${pathname}?${searchParams}`)
  }

  return (
    <Pagination
      onChange={(selectedPage) => handleChangePage(selectedPage)}
      className="mx-auto w-fit mt-5"
      isCompact
      total={500}
      initialPage={+params.get("page")! || 1}
    />
  );
}
