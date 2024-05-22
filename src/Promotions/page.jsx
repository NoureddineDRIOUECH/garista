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

export default function DemoPagePromotion() {
//   const data = getData()

const data= [
    {
        id: "1",
        image:"https://i.pinimg.com/564x/c2/78/76/c2787689c506fb61999d8c9d88bccaab.jpg",
        text: "offre de 25%",
        available: true,
        visible: false,

    },
    {
        id: "2",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        text: "offre de 30%",

        available: true,
        visible: true
    },

]
  console.log(data)
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
    <Header/>
<div className="container mx-auto py-10">

      <DataTable columns={columns} data={data} />
    </div>
    </>

  )
}
