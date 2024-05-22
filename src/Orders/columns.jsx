
import {useState} from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { IoCheckmarkOutline } from "react-icons/io5"
import { Switch } from '@/components/ui/switch'
import axios from "axios"
import { useEffect } from "react"
import { axiosInstance } from "../../axiosInstance"

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];  // This splits the ISO string at 'T' and takes the first part (the date)
}


const updateStatus = (newStatus, orderId) => {
  // Make an HTTP request to your API to update the status
  console.log("The order Id is ",orderId);
  axiosInstance.put(`/api/order/${orderId}`, { status: newStatus })
    .then(response => {
      console.log('Status updated successfully:', response.data);
    })
    .catch(error => {
      console.error('Error updating status:', error);
    });
};

const fetchOrderDetails = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/api/order/${orderId}`);
    console.log("The Item => ", response.data);
    return response.data; // Assuming this returns the full order details including items
  } catch (error) {
    console.error("Failed to fetch order details:", error);
    return null; // Return null or appropriate error handling
  }
};
function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday = dateTime.toLocaleDateString() === today.toLocaleDateString();
  const isYesterday = dateTime.toLocaleDateString() === yesterday.toLocaleDateString();

  if (isToday) {
    return dateTime.toLocaleTimeString();
  } else if (isYesterday) {
    const date = 'Yesterday';
    const time = dateTime.toLocaleTimeString();
    return `${date} ${time}`;
  } else {
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${date} ${time}`;
  }
}

const OrderItemsCell = ({ orderId }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("The Id => ", orderId);
  useEffect(() => {
    setLoading(true);
    fetchOrderDetails(orderId).then(data => {
      setItems(data.dishes); // Assuming the API returns an object with a dishes array
    });
    setLoading(false);
  }, [orderId]);

  if (loading) return <span>Loading...</span>;
  if (!items) return <span>No items</span>;

  return <span>{items.map(item => item.name).join(', ')}</span>; // Displaying item names as a string
};
export const columns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "created_at",
        header: "DATE",
        cell: ({ row }) =>  formatDateTime(row.original.created_at)
      },
      {
        accessorKey: "items",
        header: "ITEMS",
        cell: ({row}) =>   OrderItemsCell({orderId: row.original.id}) 
      },
      {
        accessorKey: "total",
        header: "SUBTOTAL",
      },
      {
        accessorKey: "table_id",
        header: "TABLE",
        cell: ({ row }) => <div>{row.original.table.name}</div>
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ row }) => {
                  const status = row.original.status
                  const [choose,setChoose] = useState(status)

                  let backgroundColor = '';
                  if(choose == "Canceled")
                  {
                    backgroundColor = "#ffe1df"
                  }
                  else if(choose == "New"){
                    backgroundColor = "#C4E4FF"
                  }
                  else if(choose == "Processing"){
                    backgroundColor = "#FFC374"
                  }
                  else if(choose == "Completed"){
                    backgroundColor = "#D9EDBF"
                  }


                  console.log("The Status Valuse => ", choose)

                  return (
                    <Select onValueChange={(val) => { setChoose(val); updateStatus(val , row.original.id); }} >
                    <SelectTrigger className={`w-[120px] `} style={{backgroundColor: backgroundColor}}>
                      <SelectValue defaultValue={status} placeholder={status ? status : "Status"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  )
                },
              },



//   {
//     id: "actions",
//     header:"ACTIONS",
//     cell: ({ row }) => {
//       const payment = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="center">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Update
//             </DropdownMenuItem>

//             <DropdownMenuItem>Delete</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
  // ...
]



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


