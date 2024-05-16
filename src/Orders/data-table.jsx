import React,{useState} from "react"
import {
  flexRender,
//   SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,

    getFilteredRowModel,
} from "@tanstack/react-table"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"
  import { Input } from "@/components/ui/input"
//   import { Table } from "@tanstack/react-table"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaCirclePlus } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { axiosInstance } from "../../axiosInstance"
import { useEffect } from "react"
import axios from "axios"
export function DataTable({

    columns,
    // data,
    SetisOpen,
  }) {
    // const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [data, setData] = useState([])
    useEffect(() => {
      getOrders()
    }, [])
 
    const getOrders = async () => {
      try{
        const restoInfo = sessionStorage.getItem('RestoInfo');
        let Data = [];
        Data = JSON.parse(restoInfo)
        let id;
        Data.map(item => {
          //  setRestoInfo(item)
          //  fetchCategories(item.id)
           id = item.id;
        })
         const res = await axiosInstance.get('/api/order_resto/'+id)
         if(res)
         {
          console.log('The Response => ', res.data);
          let Data = [];
          Data = res.data;
          // Data.map((item) =>  {
          //   orderDetail(item)
          //   console.log("The Item => ", item);
          // })
          setData(res.data)
         }
      } 
      catch(err)
      {
        console.log('the Error => ', err.message);
      }
    }

    console.log("The Data => ", data);
    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 5,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            columnFilters,
        },
    });
    const HandleOpen =()=>{
        SetisOpen(true)
    }


  console.log("The Data create => ",HandleOpen);
  return (
    <>
      <div className="flex items-center py-4 justify-between pr-4 border-b-[1px]">
                <div className="flex items-center gap-10 w-5/12">
                    <Input
                        placeholder="Filter Names..."
                        value={
                            (table.getColumn("name")?.getFilterValue() ) ??
                            ""
                        }
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(
                                event.target.value
                            )
                        }
                        className="max-w-sm  border-solid outline-none "
                    />
                </div>
                <div className="flex justify-between gap-3">
                <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[2, 5, 10, 15, 20].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
                {/* <Dialog className=" p-8 shadow-lg h-[45rem] w-[65rem] rounded-xl">
                <DialogTrigger className="flex justify-center">
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-white ">
                <FaCirclePlus
                        className="h-6 w-6 cursor-pointer text-white "/>
                </Button>
                </DialogTrigger>
                <DialogContent style={{ padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', height: '45rem', width: '65rem', maxWidth: '80rem', borderRadius: '1rem' }}>
                  <DialogHeader>
                    <h2 className="text-2xl font-bold mb-4 text-center">Create Dishes</h2>
                    <div className='flex items-start gap-10 p-10 '>
                        <div className='w-6/12 '>
                            <div
                                className="h-40 bg-slate-200 flex justify-center items-center rounded cursor-move"
                                draggable="true"

                            >
                                <h1>drag-image...</h1>
                            </div>
                            <div className=''>
                                <Input type="text" placeholder="Title" className='mt-5 mb-5' />
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select Restaurant...</SelectLabel>
                                            <SelectItem value="apple">whd</SelectItem>
                                            <SelectItem value="banana">aweb</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <textarea name="" id="" className='mt-5 mb-5 border p-2 ' placeholder='description' cols={48} rows={6}></textarea>
                            </div>
                        </div>

                        <Input type="text" placeholder="Normale Price" className='mt-5 mb-5' />
                    </div>
                    <div className='float-right flex gap-2 items-center '>
                        <button  className='border px-4 py-2 rounded bg-black text-white hover:bg-zinc-600 duration-1000'>Confirm</button>
                        <button  className='border px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-800 duration-1000'>Cancel</button>
                    </div>
                    </DialogHeader>
                  <DialogFooter className="flex justify-center items-center">
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}

                </div>
            </div>
    <div className="rounded-md border">

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

       <div className="flex items-center justify-end px-2">

      <div className="flex items-center space-x-6 lg:space-x-8">

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

         <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-black text-white hover:bg-black hover:text-white"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-black text-white hover:bg-black hover:text-white"
        >
          Next
        </Button>
      </div>
      </div>
    </div>


    </>
  )
}
