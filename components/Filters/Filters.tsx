import { Select, SelectItem } from "@nextui-org/react";

const years = Array.from({ length: 10 }).map(
  (_, index) => new Date().getFullYear() - index
);

export default function Filters() {
  return (
    <div className="p-5 mx-auto max-w-[80%]">
      <form className="flex justify-center md:justify-between gap-5 flex-wrap">
        <div className="flex items-center gap-5 max-w-md">
          Sort by:
          <Select label="Year" className="w-24">
            {years.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </Select>
          <Select label="Order" className="w-24">
            <SelectItem key={"ASC"} value="asc">ASC</SelectItem>
            <SelectItem key={"DESC"} value="desc">DESC</SelectItem>
          </Select>
        </div>
        <div className="flex items-center gap-5">
          ⭐
          <input type="range" min={0} max={10} defaultValue={5} />
          stars
        </div>
      </form>
    </div>
  );
}
