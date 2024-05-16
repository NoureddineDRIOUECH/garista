
import {useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";
import { MdErrorOutline } from "react-icons/md";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { IoCheckmarkOutline } from "react-icons/io5"
import { Switch } from '@/components/ui/switch'
import UpdateForm from "./updateForm";
import DeletForm from "./DeletForm";
export const columns = [
    {
        accessorKey: "image",
        header: () => <div className="ml-1">IMAGE</div>,
        cell: ({ row }) => (
          <div className="capitalize ml-1 w-16">
              {/* {console.log("The Images of Update => ",JSON.parse(row.original) )} */}
                <img className="h-16  rounded-full" alt={row.getValue("title")} src={`http://localhost:8000/${row.original.image}`}/>
            </div>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
      },


    {
        accessorKey: "visibility",
        header: "VISIBLE",
        cell: ({ row }) => {

            const [isActive, setIsActive] = useState(row.getValue("visibility"));

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
     
      const [updateFormState, setUpdateFormState] = useState(false);

      return (
        <>
        <div className="flex gap-2">
        <Button onClick={() => setUpdateFormState(true)} >
            <BiSolidEdit size={20}/>
        </Button>

        <DeletForm id={row.original.id}/>
        </div>

        <UpdateForm updateFormState={updateFormState} setUpdateFormState={setUpdateFormState} />
        </>
      )
    },
  },
]


