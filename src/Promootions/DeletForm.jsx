import React,{useState} from "react";
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
import { MdErrorOutline } from "react-icons/md";
import Uploader from "./uploader";
import { Button } from "@/components/ui/button"
import { BiSolidTrash } from "react-icons/bi";
function DeleteForm({deleteFormState, setDeleteFormState, id, handleDelete}) {
    const toastMessage = 'User Deleted.';

  return (
      <Dialog className="items-center justify-center" open={deleteFormState} onOpenChange={setDeleteFormState}>
                <DialogTrigger asChild>
                <Button variant="outline" className="bg-black text-white hover:text-white hover:bg-black"><BiSolidTrash size={20}/></Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] items-center justify-center ">
                    <DialogHeader className="items-center justify-center ">
                        <DialogTitle className="flex items-center text-[1.7rem]"> Are you sure ?</DialogTitle>
                    </DialogHeader>
                    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                        <Button variant="outline" onClick={() => setDeleteFormState(!deleteFormState)}>
                          Cancel
                        </Button>
                        <Button  variant="darkBlack" onClick={() => handleDelete(id)}>Continue</Button>
                    </div>
                </DialogContent>


            </Dialog>
  )
}

export default DeleteForm
