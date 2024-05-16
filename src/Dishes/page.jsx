import { TableHeader } from "../components/ui/table"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from '@/components/ui/card'
import React ,{useState} from 'react';
import Header from '../pages/header';
import { useEffect } from "react"
import { fetchCategorie } from "../../actions/Categorie/getCategories"
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

const [categorieData, setCategorieData] = useState([])
useEffect(() => {
  async function fetchCate(){
     const response = await fetchCategorie();
     setCategorieData(response)
  }

  fetchCate()
}, [])

const data= [
    {
        id: "1",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "Laptop Dell",
        categories: "Burgers",
        price: 55,

        visible: false,

    },
    {
        id: "2",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "PlayStation",
        categories: "Burgers",
        price: 35,

        visible: true
    },
    {
        id: "3",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "Mobile Samsung Galaxy S23",
        categories: "Burgers",
        price: 75,

        visible: true
    },
    {
        id: "4",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "Gaming PC",
        categories: "Burgers",
        price: 60,

        visible: true
    },
    {
        id: "5",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "Mac",
        categories: "Burgers",
        price: 55,

        visible: true
    },
    {
        id: "6",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "Smart Watch",
        categories: "Burgers",
        price: 55,

        visible: true
    },
    {
        id: "7",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "XBox",
        categories: "Burgers",
        price: 45,

        visible: true
    },
    {
        id: "8",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "IPad",
        categories: "Burgers",
        price: 55,

        visible: true
    },
    {
        id: "9",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "Ear Buds",
        categories: "Burgers",
        price: 66,

        visible: true
    },
    {
        id: "10",
        image:"https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg",
        name: "SSD",
        categories: "Burgers",
        price: 55,

        visible: true
    }
]
  console.log(data)
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
 <div className="flex items-center justify-between space-y-2 p-4 pt-20">
            <h2 className="text-3xl font-bold tracking-tight">Dishes</h2>
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

      <DataTable  categries={categorieData}/>
    </div>
    </>

  )
}
