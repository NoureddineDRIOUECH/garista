import React,{useState} from "react"
import Uploader from "./uploader";

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
import { BiSolidEdit } from "react-icons/bi";
import { Switch } from '@/components/ui/switch'


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
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
import { useEffect } from "react";
import { da, fi } from "date-fns/locale";
import { axiosInstance } from "../../axiosInstance";
import { Controller, useForm } from "react-hook-form";
import { addBanner, deleteBanner } from "../../actions/Banner/Banner";
import { APIURL } from "../../lib/ApiKey";
import { AddPromo } from "./AddPromo";
import DeletForm from "./DeletForm";
import UpdateForm from "./updateForm";
import Spinner from "react-spinner-material";
import { toast } from "react-hot-toast";

export function DataTable() {


    // const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const { control, handleSubmit, register, formState: { errors }, setError,reset  } = useForm();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [isChecking, setIsChecking] = useState('')
    // const [isActive, setIsActive] = useState("");

    const columns = [
      {
          accessorKey: "image",
          header: () => <div className="ml-1">IMAGE</div>,
          cell: ({ row }) => (
            <div className="capitalize ml-1 w-16">
                {/* {console.log("The Images of Update => ",JSON.parse(row.original) )} */}
                  <img className="h-16  rounded-full" alt={row.getValue("title")} src={`${APIURL}/storage/${row.original.image}`}/>
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
  
              const handleToggleChange = async () => {
                setIsActive(!isActive); // Update local state
                try {
                    // Make API call to update backend data
                    const response = await axiosInstance.put(`/api/banners/${row.original.id}`, {
                      visibility: !isActive // Toggle the visibility state
                    });
                    if (response) {
                        console.log("Toggle switch state updated successfully");
                    } else {
                        console.error("Failed to update toggle switch state");
                    }
                } catch (error) {
                    console.error("Error updating toggle switch state:", error);
                }
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
        const [deleteFormState, setDeleteFormState] = useState(false);

        return (
          <>
          <div className="flex gap-2">
          <Button onClick={() => setUpdateFormState(true)} >
              <BiSolidEdit size={20}/>
          </Button>
  
          <DeletForm id={row.original.id} handleDelete={handleDeleteItem} deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState}/>
          </div>
  
           <UpdateForm updateFormState={updateFormState} setUpdateFormState={setUpdateFormState} id={row.original.id} handleUpdate={handleUpdate} />
          </>
        )
      },
    },
  ]
    const handleDelete = () => {
        setFile(null);
        setFileName("");
      };

      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(false);
      const [resotInfo, setRestoInfo] = useState([]) 

      const fetchValue = async (id) => {
        setLoading(true)
        try{
          const restoInfo = sessionStorage.getItem('RestoInfo');
          let Data = [];
          Data = JSON.parse(restoInfo)
          Data.map(item => {
             setRestoInfo(item)
             id = item.id;
          })
          const respone = await axiosInstance.get("/api/banners/"+id)
          console.log("The Response => ",respone.data);
          if(respone)
          {
            setData(respone.data)
            setLoading(false)
          }
        }
        catch(err)
        {
          console.log("The Error => ", err.message);
          if(err.message === "Request failed with status code 404")
          {
            setLoading(false)
          }
        }
      }
      
      useEffect(() => {
        // Fetch data from the API when the component mounts

        fetchValue()
      }, []);
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log("The SelectedFile => ",selectedFile);
        // setFile(selectedFile);
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            // setError('file', { type: 'manual', message: '' }); // Clear any previous error message
        }
    };

    const handleDeleteItem = async (id) => {
      // console.log("the Id Of delete", idDelete);
      // try{
      //   const res = await deleteBanner(idDelete)
      //   if(res){
      //     console.log("Succedd => ",res);
      //     fetchValue()
      //   }
      // }
      // catch(err)
      // {
      //   console.log('The Error => ',err);
      // }
      console.log("The ID => ",id);
      try {
        const response = await axiosInstance.delete(`/api/banners/${id}`);

        if (response) {
            console.log("Banner added successfully");
            // fetchValue();
            setData(data.filter(item => item.id !== id));
            toast.success("Item deleted successfully");
            
        } else {
            console.error("Failed to add category => ",response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
    }

    const handleUpdate = async ({
      id,
      title,
      toastMessage
    }) => {
// Assuming this is a default value for resto_id

      try {

          const response = await axiosInstance.put(`/api/banners/${id}`,{
            title: title
          }
          );
  
          if (response) {
              console.log("Banner Updated successfully", response.data);
              // setFile(null)
              // setFileName("")
              // reset();
              toast.success(toastMessage);

              fetchValue(resotInfo.id);
              
          } else {
              console.error("Failed to add category");
          }

      } catch (error) {
          console.error("Error:", error);
      }
   }
    const handleVisible = async ({
      isActive
    }) => {

      console.log("The visibility => ", isActive);
   }
    
    const handleAddUser = async (data, toastMessage) => {
      // console.log("The Images => ", images);


      const formData = new FormData();
      formData.append("image", data.images);
      formData.append("title", data.title);
      formData.append("resto_id", resotInfo.id);
      try {
          const response = await fetch(`${APIURL}/api/banners`, {
              method: "POST",
              body: formData,
          });
  
          if (response.ok) {
              console.log("Banner added successfully");
              // setFile(null)
              // setFileName("")
              // reset();
              fetchValue(resotInfo.id);
              
              toast.success(toastMessage);
              
          } else {
              console.error("Failed to add category");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  };

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
  

    const onSubmit = (data) => {
      // Handle form submission here
      console.log("The Data =>",data);
      handleAddUser(data);
  };


    console.log("The file => ", isChecking);

    if(loading)
    {
      return(
        <div className='justify-center items-center flex  h-[50vh]'>
          <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
        </div>
      )
    }
  return (
    <>
      <div className="flex items-center py-4 justify-between pr-4 border-b-[1px]">
                <div className="flex items-center gap-10 w-5/12">
                    <Input
                        placeholder="Filter Names..."
                        value={
                            (table.getColumn("title")?.getFilterValue() ) ??
                            ""
                        }
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(
                                event.target.value
                            )
                        }
                        className="max-w-sm  border-solid outline-none "
                    />
                </div>
                <div className="flex justify-between gap-3">

                    <AddPromo 
                    errors={errors}
                    file={file}
                    fileName={fileName}
                    handleImageChange={handleImageChange}
                    handleSubmit={handleAddUser}
                    onSubmit={onSubmit}
                    register={register}
                    control={control}
                    handleDelete={handleDelete}
                    />
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

       <div className="flex items-center justify-between px-2">
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
              className="bg-zinc-500"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="bg-black"
            >
              Next
            </Button>
          </div>
          </div>
    </div>


    </>
  )
}
