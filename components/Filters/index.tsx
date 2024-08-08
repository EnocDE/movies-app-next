"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const years: (number | string)[] = Array.from({ length: 10 }).map(
  (_, index) => new Date().getFullYear() - index
);
years.unshift("All");

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleSetFilter = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (!e.target.value && !e.target.name) return;
    const newUrl = new URLSearchParams(window.location.search);

    if (newUrl.get(e.target.name) != null) {
      newUrl.set(e.target.name, e.target.value)
    } else {
      newUrl.append(e.target.name, e.target.value);
    }
    
    router.replace(`${pathname}?${newUrl}`)
  };

  return (
    <div className="p-5 mx-auto max-w-[80%]">
      <form className="flex justify-center md:justify-between gap-5 flex-wrap">
        <div className="flex items-center gap-5 max-w-md">
          <label>Sort by:</label>
          <Select
            name="year"
            label="Year"
            className="w-24"
            value={params.get("year") || undefined}
            onChange={(e) => handleSetFilter(e)}
          >
            {years.map((year) => (
              <SelectItem key={year} value={year} textValue={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </Select>
          <Select
            name="order"
            label="Order"
            className="w-24"
            value={params.get("order") || undefined}
            onChange={(e) => handleSetFilter(e)}
          >
            <SelectItem key={"ASC"} value="asc">
              ASC
            </SelectItem>
            <SelectItem key={"DESC"} value="desc">
              DESC
            </SelectItem>
          </Select>
        </div>
        <div className="flex items-center gap-5">
          ⭐
          <input
            name="stars"
            type="range"
            min={0}
            max={10}
            value={+params.get("stars")! || 0}
            onChange={(e) => handleSetFilter(e)}
          />
          <label htmlFor="stars">{params.get("stars") || 0}</label>
        </div>
      </form>
    </div>
  );
}
