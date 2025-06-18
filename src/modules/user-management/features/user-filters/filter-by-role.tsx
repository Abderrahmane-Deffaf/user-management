"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseAsString, useQueryState } from "nuqs";

export default function FilterByRole() {
  const [role, setRole] = useQueryState("role", parseAsString.withDefault(""));
  return (
    <div>
      <Select
        onValueChange={(value) => setRole(value, { shallow: false })}
        defaultValue={role}
      >
        <SelectTrigger className=" w-full">
          <SelectValue defaultValue={role} placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent className=" w-full">
          <SelectItem value={"default"}>Default</SelectItem>
          {["admin", "editor", "viewer"].map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
