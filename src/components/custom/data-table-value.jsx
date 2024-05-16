import React,{ useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { SlOptions } from "react-icons/sl"
import { Button } from "../ui/button"
import { DataTableDemo } from "./table2"
// import { useMyContext } from "@/context/Context"
import { Switch } from '@/components/ui/switch'
import { IoCheckmarkOutline } from 'react-icons/io5';



const DataTableValue = ({ setIsOpen }) => {
//     const [rows, setRows] = useState([
//     {
//         id: "1",
//         name: "Laptop Dell",
//         groups: 2,
//         reference: 55000,
//         available: true,
//         visible: false,

//     },
//     {
//         id: "2",
//         name: "PlayStation",
//         groups: 5,
//         reference: 35000,
//         available: true,
//         visible: true
//     },
//     {
//         id: "3",
//         name: "Mobile Samsung Galaxy S23",
//         groups: 2,
//         reference: 75000,
//         available: false,
//         visible: true
//     },
//     {
//         id: "4",
//         name: "Gaming PC",
//         groups: 2,
//         reference: 155000,
//         available: true,
//         visible: true
//     },
//     {
//         id: "5",
//         name: "Mac",
//         groups: 2,
//         reference: 55000,
//         available: true,
//         visible: true
//     },
//     {
//         id: "6",
//         name: "Smart Watch",
//         groups: 4,
//         reference: 55000,
//         available: true,
//         visible: true
//     },
//     {
//         id: "7",
//         name: "XBox",
//         groups: 5,
//         reference: 45000,
//         available: true,
//         visible: true
//     },
//     {
//         id: "8",
//         name: "IPad",
//         groups: 2,
//         reference: 55000,
//         available: true,
//         visible: true
//     },
//     {
//         id: "9",
//         name: "Ear Buds",
//         groups: 2,
//         reference: 10000,
//         available: true,
//         visible: true
//     },
//     {
//         id: "10",
//         name: "SSD",
//         groups: 2,
//         reference: 15000,
//         available: true,
//         visible: true
//     }
// ]) 

const data = [
    {
        id: "1",
        name: "Laptop Dell",
        groups: 2,
        reference: 55000,
        available: true,
        visible: false,

    },
    {
        id: "2",
        name: "PlayStation",
        groups: 5,
        reference: 35000,
        available: true,
        visible: true
    },
    {
        id: "3",
        name: "Mobile Samsung Galaxy S23",
        groups: 2,
        reference: 75000,
        available: false,
        visible: true
    },
    {
        id: "4",
        name: "Gaming PC",
        groups: 2,
        reference: 155000,
        available: true,
        visible: true
    },
    {
        id: "5",
        name: "Mac",
        groups: 2,
        reference: 55000,
        available: true,
        visible: true
    },
    {
        id: "6",
        name: "Smart Watch",
        groups: 4,
        reference: 55000,
        available: true,
        visible: true
    },
    {
        id: "7",
        name: "XBox",
        groups: 5,
        reference: 45000,
        available: true,
        visible: true
    },
    {
        id: "8",
        name: "IPad",
        groups: 2,
        reference: 55000,
        available: true,
        visible: true
    },
    {
        id: "9",
        name: "Ear Buds",
        groups: 2,
        reference: 10000,
        available: true,
        visible: true
    },
    {
        id: "10",
        name: "SSD",
        groups: 2,
        reference: 15000,
        available: true,
        visible: true
    }
]


const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="w-6 h-6 rounded-full  border-gray-400"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="w-6 h-6 rounded-full text-blue-400 border-gray-400"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: () => <div className="ml-10">NAME</div>,
        cell: ({ row }) => (
            <div className="capitalize ml-10">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "groups",
        header: ({ column }) => {
            return (
                <div >GROUPS</div>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("groups")}</div>,
    },
    {
        accessorKey: "reference",
        header: () => <div className="">REFERENCE</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("reference"))
            return <div className=" font-medium">{amount}</div>
        },
    },
    // {
    //     accessorKey: "available",
    //     header: "AVAILABLE",
    //     cell: ({ row }) => {
    //         const isAvailable = row.getValue("available")
    //         return (
    //             <div className="capitalize">{isAvailable ? <IoCheckmarkOutline className="h-5 w-5 text-blue-400" /> : <IoCheckmarkOutline className="h-5 w-5 text-red-400" />}</div>
    //         )
    //     },
    // },
    {
        accessorKey: "available",
        header: "AVAILABLE",
        cell: ({ row }) => {
            const [isAvailable, setIsAvailable] = useState(row.getValue("available"));

            const handleToggleChange = () => {
                setIsAvailable(!isAvailable);
            };

            return (
                <div className="capitalize">
                    <Switch onClick={handleToggleChange} checked={isAvailable} />
                </div>
            );
        },
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
        accessorKey:"id",
        id: "id",
        header: "ACTIONS",
        cell: ({ row }) => {
            const { myState, toggleState } = useMyContext();
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="px-4 py-4 focus:border-none  text-black">
                            <span className="sr-only  text-black">Open menu</span>
                            <SlOptions size={20} className=" cursor-pointer text-blue-500  " />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={toggleState}
                        >
                            Update
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

console.log(data, columns)


    return (
        <div className="">
             <DataTableDemo data={data} columns={columns} type="DISHES" setIsOpen={true} />
        </div>
    )
    }

export default DataTableValue
