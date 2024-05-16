import React,{useState , useEffect} from "react"
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

import { toast } from "react-hot-toast";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"
  import { Input } from "@/components/ui/input"
//   import { Table } from "@tanstack/react-table"

import { APIURL } from "../../lib/ApiKey";
import { axiosInstance } from "../../axiosInstance";
import { BiSolidEdit } from "react-icons/bi";

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
  import AddDrink from './AddDrink';
  import { useForm } from "react-hook-form";
  import DeletForm from "./DeleteForm";

  import UpdateForm from "./updateForm";
  
  import { Switch } from '@/components/ui/switch'

import Spinner from "react-spinner-material";
  import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
export function DataTable({
  }) {
    const columns = [
      {
          accessorKey: "image",
          header: () => <div className="ml-1">IMAGE</div>,
          cell: ({ row }) => (
              <div className="capitalize ml-1 w-16">
                  <img className="h-16  rounded-full" src={`${APIURL}/storage/${row.getValue("image")}`}/>
              </div>
          ),
      },
      {
          accessorKey: "name",
          header: "NAME",
      },
      {
        accessorKey: "categories",
        header: "CATEGORIES",
        cell: ({ row }) => {

            return (
                <div className="capitalize">
                    {row.original.categorie.name}
                </div>
            );


    }
      },
      {
        accessorKey: "price",
        header: "PRICE",
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
                  const response = await axiosInstance.put(`/api/drinks/${row.original.id}`, {
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
    
    
            <UpdateForm handleImageUpdate={handleImageUpdate} isDialogOpen={updateFormState} setIsDialogOpen={setUpdateFormState} id={row.original.id} handleUpdate={handleUpdate}/>
            </>
          )
        },
      },
    ]
    // const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const { register, handleSubmit,control ,formState: { errors } } = useForm();
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [resotInfo, setRestoInfo] = useState([]) 

    const [loading, setLoading] = useState(false);

    const fetchCategories = async (id) => {
      setLoading(true)
      try{
        
        const respone = await axiosInstance.get("/api/categories/"+id)
        console.log("The Response => ",respone.data);
        if(respone)
        {
          setCategories(respone.data)
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
    const fetchValue = async (id) => {
      setLoading(true)
      try{
        const restoInfo = sessionStorage.getItem('RestoInfo');
        let Data = [];
        Data = JSON.parse(restoInfo)
        Data.map(item => {
           setRestoInfo(item)
           fetchCategories(item.id)
           id = item.id;
        })
        const respone = await axiosInstance.get("/api/drinks/"+id)
        console.log("The Response => ",respone.data);
        if(respone)
        {
          setData(respone.data)
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
      finally{
        setLoading(false)
      }
    }

    const handleAddDrink = async (data, toastMessage) => {
      console.log('The Image ', data.image);
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("price", data.price);
      formData.append("category_id",parseInt(data.category_id));
      formData.append("resto_id", resotInfo.id);
      try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
          // const response = await axiosInstance.post(`/api/dishes`, formData,
          //   );
          const response = await fetch(`${APIURL}/api/drinks`, {
            method: "POST",
            body: formData,
        },);
          if (response) {
              console.log("Banner added successfully");
              setFile(null)
              setFileName("")
              fetchValue(resotInfo.id);
              toast.success(toastMessage);
          } else {
              console.error("Failed to add category");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  };


  const handleUpdate = async ({
    data,
    toastMessage,
    id
}) => {
    try {
      console.log(`data is ${data}`);
        // setLoading(true);
         const res =  await axiosInstance.put('/api/drinks/'+id, {
            name : data.name,
            desc : data.desc,
            price : data.price,
            category_id : data.category_id,
         }
         );
          if(res)
          {
              console.log("The Added => ", res);
            }
    } catch (error) {
        console.log("The Error => ",error);
    }finally{
        toast.success(toastMessage);
        fetchValue(resotInfo.id);
      }
}

  const handleDeleteItem = async (id) => {

    console.log("The ID => ",id);
    try {
      const response = await axiosInstance.delete(`/api/drinks/${id}`);

      if (response) {
          console.log("drink deleted successfully");
          setData(data.filter(item => item.id !== id));
          toast.success("Item deleted successfully");
          
      } else {
          console.error("Failed to remove drink => ",response.statusText);
      }
  } catch (error) {
      console.error("Error:", error);
  }
  }

  const handleImageUpdate = async ({newImage, id}) => {
    try {
        const formData = new FormData();
        formData.append('image', newImage);
        const response = await axiosInstance.post(`/api/drinks/${id}/update-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(response)
        {
          console.log("The Response Data => ",response.data);
        }
    } catch (error) {
        console.error('Error updating image:', error);
    }
};

  useEffect(() => {
    fetchValue()
  }, []);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
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
                <AddDrink
              errors={errors}
              file={file}
              fileName={fileName}
              categories={categories}
              // handleImageChange={handleImageChange}
              handleSubmit={handleAddDrink}
              register={register}
              control={control}
              // handleDelete={handleDelete}
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
