import { useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./../../../components/ui/avatar";
import { axiosInstance } from "../../../../axiosInstance";
import { useState } from "react";
import { APIURL } from "../../../../lib/ApiKey";
import { BarChartIcon } from "lucide-react";

export function RecentSales({
  items
}) {

  if (items?.length === 0) {
    return (
    <div className="dark:bg-gray-800 rounded-xl p-8 flex items-center  justify-center">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
            <BarChartIcon className="w-12 h-12 text-gray-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No Data Available</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
                There is currently no data to display.
            </p>
        </div>
    </div>
    );
}

  return (
    <div className="space-y-8">
      { items?.map((item, index) => (
        <div key={index} className="flex items-center">
          <img src={`${APIURL}/storage/${item.image}`} className="rounded-full w-9 h-9 bg-slate-500"  />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
          </div>
          <div className="ml-auto font-medium">{item.count}</div>
        </div>
      ))}
    </div>
  );
}
