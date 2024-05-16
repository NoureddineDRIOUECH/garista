import React,{useState} from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";
import { FormAdd } from "./FormAdd"
const AddDiche = ({
    onSubmit,
    handleSubmit,
    register,
    handleImageChange,
    errors,
    file,
    fileName,
    control,
    handleDelete,
    categories
}) => {


  return (
    <>
    <Dialog  className=" p-8 shadow-lg h-[45rem] w-[65rem] rounded-xl">
<DialogTrigger className="flex justify-center">
                <Button variant="ghost" className="relative  rounded-md bg-black text-white">
                        Add Drinks
                </Button>
                </DialogTrigger>
        <DialogContent style={{ padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', height: '45rem', width: '65rem', maxWidth: '80rem', borderRadius: '1rem' }}>
            <FormAdd handleAdded={handleSubmit} categories={categories} />
        </DialogContent>
    </Dialog>
</>
  )
}

export default AddDiche;