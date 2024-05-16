import { TableHeader } from "../components/ui/table"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from '@/components/ui/card'
import React ,{useState} from 'react';


import Header from '../pages/header';
async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default function DemoPageOrders() {
//   const data = getData()

const data = [
    { id: 1, date: "2024-03-01", items: ["burgers", "pizza"], subtotal: 100,table:"22", status: "pending" },
    { id: 2, date: "2024-03-02", items: ["burgers", "pizza"], subtotal: 150,table:"22", status: "completed" },
    { id: 3, date: "2024-03-03", items: ["burgers", "pizza"], subtotal: 200,table:"22", status: "pending" },
    { id: 4, date: "2024-03-04", items: ["burgers", "pizza"], subtotal: 120,table:"22", status: "completed" },
    { id: 5, date: "2024-03-05", items: ["burgers", "pizza"], subtotal: 180,table:"22", status: "pending" },
    { id: 6, date: "2024-03-06", items: ["burgers", "pizza"], subtotal: 220,table:"22", status: "completed" },
    { id: 7, date: "2024-03-07", items: ["burgers", "pizza"], subtotal: 130,table:"22", status: "pending" },
    { id: 8, date: "2024-03-08", items: ["burgers", "pizza"], subtotal: 170,table:"22", status: "completed" },
    { id: 9, date: "2024-03-09", items: ["burgers", "pizza"], subtotal: 250,table:"22", status: "pending" },
    { id: 10, date: "2024-03-10", items: ["burgers", "pizza"], subtotal: 300,table:"22", status: "completed" },
];

  console.log(data)
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
    
    <div className="flex-1 space-y-4 p-8 pt-6">
    <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            <div
              className="flex items-center space-x-2 "
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: ".5rem",
              }}
            >
              <Button>Download</Button>
</div>
            </div>
        <div/>

<div className="container mx-auto py-10">

      <DataTable columns={columns} data={data} />
    </div>
    </div>
    </>

  )
}
