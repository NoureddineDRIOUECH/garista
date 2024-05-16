import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectDate() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a Date" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="last-30-days">Last 30 Days</SelectItem>
          <SelectItem value="this-month">This month</SelectItem>
          <SelectItem value="last-month">Last month</SelectItem>
          <hr className="my-3" />
          <SelectItem value="this-year">This Year</SelectItem>
          <SelectItem value="last-year">Last Year</SelectItem>
          <hr className="my-3" />
          <SelectItem value="lifetime">Lifetime</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectDate;
