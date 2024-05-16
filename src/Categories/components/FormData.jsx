import React, {useState} from 'react'
import Uploader from "./uploader";
import { useForm,Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    DialogDescription,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { axiosInstance } from '../../../axiosInstance';

const FormAdd = ({ initialData, handleAddUser, handleUpdate }) => {
    const MAX_FILE_SIZE = 2000000;
console.log("The Visibility => ", initialData);
    const formSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        image:  initialData
        ? z.optional(
            z.union([z.string(), z.instanceof(File)])
          )
          .refine((file) => typeof file === 'string' || (file instanceof File && file.size <= MAX_FILE_SIZE), `Max image size is 2MB.`)
          .optional()
        : z.optional(z.instanceof(File))
          .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
          .optional(),
        visibility: z.boolean().default(true).optional(),
    });
    const ProductFormValues = z.infer;
    const ProductFormProps = {
        initialData: null,
        categories: [],
    };
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState([]);
    const [linkInput, setLinkInput] = useState("");
    const [isVisible, setisVisible] = useState(true);
    // {initialData &&
    //   setisVisible(initialData.visibility)
    // }
    const title = initialData ? 'Edit Categorie' : 'Add a new Categorie';
      const description = initialData ? 'Edit a product.' : 'Add a new product';
      const toastMessage = initialData ? 'Product updated.' : 'Product created.';
      const action = initialData ? 'Save changes' : 'Create';
      const defaultValues = initialData ? {
          ...initialData,
        // images: null,
        visibility: initialData.visibility ?? true,
      } : {
          name: '',
        // image: null,
        visibility: true,
        
    };

    const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues
    });
    const handleImageUpdate = async ({newImage, id}) => {
        try {
            const formData = new FormData();
            formData.append('image', newImage);
            const response = await axiosInstance.post(`/api/categories/${id}/update-image`, formData, {
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
    // const handleImageUpdate = async (data) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('image', data.images);
    //         const response = await axiosInstance.post(`/api/categories/${form.getValues('id')}/update-image`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         if(response)
    //         {
    //         console.log("The Response Data => ",response.data);
    //         }
    //     } catch (error) {
    //         console.error('Error updating image:', error);
    //     }
    // };
    console.log("The Inital Data => ", form.getValues('id'));

    const onSubmit = async (data) => {

    if(initialData)
    {
        if( typeof data.image != 'string') {
            console.log('Data Image ',data)
            handleImageUpdate({newImage: data.image, id: initialData.id})
            }

       console.log('Data in update :',data)
        handleUpdate({id: form.getValues('id'),data: data,toastMessage: toastMessage})
        // handleImageUpdate(data)
    }
    else{

    console.log('Data in add :',data)
        handleAddUser(data, toastMessage)
    }
    };
  return (
    <>
         <DialogTitle>{title}</DialogTitle>
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-3 items-center justify-center pt-4">
                                        <div className="flex gap-3"><FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Name" disabled={loading}  className="w-[37rem] p-2 border border-gray-300 rounded-md"  {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                   </div>
                            <div className="flex gap-3">
                            <FormField
                                  control={form.control}
                                  name="image"
                                  render={({ field, formState }) => (
                                  <FormItem>

                                  <FormLabel>Categorie Image</FormLabel>
                                  <FormControl>
                                  <Uploader
                                onChange={(image) => form.setValue("image", image)} initalData={initialData}
                                  getValue={form.getValues('image')}/>
                                  </FormControl>
                                  {formState.errors.image && (
                                    <FormMessage error={formState.errors.image.message} />
                                  )}
                                  </FormItem>
                                  )}
                                  />
                            </div>
                            {initialData &&
                            <FormField
                                    control={form.control}
                                    name="visibility"
                                    render={({ field }) => (
                                        <FormItem>
                                        <div className="flex gap-3 mt-5">
                                            <FormLabel style={{fontSize:"20px"}}>
                                            Visibilty
                                            </FormLabel>
                                        <FormControl>
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={(value) => form.setValue('visibility', value)}
                                            />
                                            
                                        </FormControl>
                                        </div>
                                        </FormItem>
                                    )}
                                    />
                                  }
                                <Button type="submit" variant="outline" className="justify-end items-end bg-black hover:bg-black text-white hover:text-white" 
                                // onClick={handleAddUser}
                                >{action}</Button>
                            
                        </div>
                </form>
            </Form>
    </>
  )
}

export default FormAdd;