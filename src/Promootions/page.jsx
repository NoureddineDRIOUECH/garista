import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import React ,{useState, useEffect} from 'react';
import { axiosInstance } from "../../axiosInstance"
import Spinner from 'react-spinner-material';
import { BiSolidEdit } from "react-icons/bi";
import { Switch } from '@/components/ui/switch'
import UpdateForm from "./updateForm";
import DeletForm from "./DeletForm";
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
    const [dataBanner, setDataBanner] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      // Fetch data from the API when the component mounts
      const fetchValue = async () => {
        // setLoading(true)
        try{
          
          const respone = await axiosInstance.get("/api/banners")
          if(respone)
          {
           
            setDataBanner(respone.data)
          }
          // setLoading(false)
        }
        catch(err)
        {
          console.log("The Error => ", err);
        }
      }
      fetchValue()
    }, []);


 
    
  console.log(data)
  console.log("The Data Banner => ", dataBanner);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
    {
        loading
        ?
        <div className='justify-center items-center flex  h-[50vh]'>
        <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
      </div>
        :
        <>
        <div className="flex items-center justify-between space-y-2 p-4 pt-20">
                <h2 className="text-3xl font-bold tracking-tight">Promotions</h2>
                </div>
            <div className="container mx-auto py-10">

          <DataTable columns={columns} />
        </div>
        </>
    }
    </>

  )
}



