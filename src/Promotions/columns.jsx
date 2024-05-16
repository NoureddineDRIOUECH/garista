
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { IoCheckmarkOutline } from "react-icons/io5"
import { Switch } from '@/components/ui/switch'
export const columns = [
    {
        accessorKey: "image",
        header: () => <div className="ml-1">IMAGE</div>,
        cell: ({ row }) => (
            <div className="capitalize ml-1 w-16">
                <img className="h-16  rounded-full" src={row.getValue("image")}/>
            </div>
        ),
    },
    {
        accessorKey: "text",
        header: "TEXT",
      },


    {
        accessorKey: "visible",
        header: "VISIBLE",
        cell: ({ row }) => {

            const [isActive, setIsActive] = useState(row.getValue("visible"));

            const handleToggleChange = () => {
                setIsActive(!isActive);
            };
            return (
                <div className="capitalize">
                    <Switch onClick={handleToggleChange} checked={isActive} />
                </div>
            );


    }
},

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Update
            </DropdownMenuItem>

            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  // ...
]



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


