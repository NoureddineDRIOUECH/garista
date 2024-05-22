import React,{useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import ImageUploading from 'react-images-uploading';
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import Uploader from "./uploader";
import { Button } from "@/components/ui/button"
import { getRoles } from "../../../actions/Role/getRoles";
import { FormAdd } from "./FormAdd";
import { axiosInstance } from "../../../axiosInstance";
import Spinner from "react-spinner-material";

export default function UpdateForm({isDialogOpen, setIsDialogOpen, id, handleUpdate}) {

    const [isLoading, setIsLoading] = useState(false)

    console.log("The Id => ", id);

    const handleDialogClose = () => {
      setIsDialogOpen(false);
    };

    const [tableNames, setTableNames] = useState([]);
    const [roles, setRoles] = useState([])

    
    useEffect(() => {
        const fetchUpdate = async() => {
            setIsLoading(true)
            try{
              const res = await axiosInstance.get('/api/staffs/'+id)
              if(res)
              {
                console.log("The Response => ",res);
                let Data = [];
                Data = res.data
                setTableNames(Data)
                setIsLoading(false)
            }
            }
            catch(err)
            {
                setIsLoading(true)
                console.log("The Error => ", err);
            }
            finally{
                setIsLoading(false) 
            }
        }
        const fetchValues = async () => {
            try{
               const res = await getRoles();
               if(res)
               {
                console.log("The Result => ", res);
                setRoles(res)
               }
    
            }
            catch(err)
            {
                console.log("The error => ",err);
            }
        }

        fetchValues()
        fetchUpdate()
    }, [])

    console.log("The Table Name => ",tableNames);
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>

        <DialogContent className="max-w-[50rem]">
        <DialogHeader>
            {
                !isLoading
                ?
                <FormAdd initialData={tableNames} selectedRoleId={String(tableNames.role_id)} roles={roles} handleUpdate={handleUpdate}/>
                :
                <div className='justify-center items-center flex'>
                <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
               </div>
            }
        </DialogHeader>

        </DialogContent>
    </Dialog>
  )
}
