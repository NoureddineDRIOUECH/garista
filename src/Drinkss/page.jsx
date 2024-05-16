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

export default function DemoPage() {
//   const data = getData()

const data= [
    {
        id: "1",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "Laptop Dell",
        categories: "Avocado Smoothie",
        price: 55,

        visible: false,

    },
    {
        id: "2",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "PlayStation",
        categories: "Avocado Smoothie",
        price: 35,

        visible: true
    },
    {
        id: "3",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "Mobile Samsung Galaxy S23",
        categories: "Avocado Smoothie",
        price: 75,

        visible: true
    },
    {
        id: "4",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "Gaming PC",
        categories: "Avocado Smoothie",
        price: 60,

        visible: true
    },
    {
        id: "5",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "Mac",
        categories: "Avocado Smoothie",
        price: 55,

        visible: true
    },
    {
        id: "6",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "Smart Watch",
        categories: "Avocado Smoothie",
        price: 55,

        visible: true
    },
    {
        id: "7",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "XBox",
        categories: "Avocado Smoothie",
        price: 45,

        visible: true
    },
    {
        id: "8",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "IPad",
        categories: "Avocado Smoothie",
        price: 55,

        visible: true
    },
    {
        id: "9",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "Ear Buds",
        categories: "Avocado Smoothie",
        price: 66,

        visible: true
    },
    {
        id: "10",
        image:"https://i.pinimg.com/564x/ca/d6/73/cad6730874353f055279a6ed4877ef51.jpg",
        name: "SSD",
        categories: "Avocado Smoothie",
        price: 55,

        visible: true
    }
]
  console.log(data)
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
     <div className="flex items-center justify-between space-y-2 p-4 pt-20">
            <h2 className="text-3xl font-bold tracking-tight">Drinks</h2>
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
<div className="container mx-auto py-10">

      <DataTable columns={columns} data={data} />
    </div>
    </>

  )
}
