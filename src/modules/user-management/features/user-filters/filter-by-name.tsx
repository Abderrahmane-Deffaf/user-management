"use client";
import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState } from "nuqs";
type FilterByNameProps = {
  filterBy: "firstname" | "lastname";
};
export default function FilterByName({ filterBy }: FilterByNameProps) {
  const [filterValue, setFilterValue] = useQueryState(
    filterBy,
    parseAsString.withDefault("")
  );
  return (
    <div>
      <Input
        type="text"
        placeholder={`Filter by: ${filterBy}`}
        value={filterValue}
        onChange={(e) =>
          setFilterValue(e.target.value, { throttleMs: 500, shallow: false })
        }
      />
    </div>
  );
}
