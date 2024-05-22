import React, {useState} from 'react'
import Uploader from "./uploader";
import { useForm } from "react-hook-form";
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

export const FormAdd = ({ initialData, categories, handleAdded }) => {
    const formSchema = z.object({
        title: z.string().min(1, 'Title is required'),
        images: z
    .instanceof(File, 'Image is required')
    .refine((val) => val !== null, { message: 'Image is required' }),
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
      const title = initialData ? 'Edit product' : 'Create product';
      const description = initialData ? 'Edit a product.' : 'Add a new product';
      const toastMessage = initialData ? 'Product updated.' : 'Banner created.';
      const action = initialData ? 'Save changes' : 'Create';
      const defaultValues = initialData ? {
        ...initialData,
      } : {
        title: '',
        images: null,
      };
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
    });
    const onSubmit = async (data) => {
        console.log('Data == ', data);
        handleAdded(data, toastMessage)
    };
  return (
    <>
       <h2 className="text-2xl font-bold mb-4 text-center">Create Promotions</h2>

     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='flex items-start gap-10 p-10 justify-center'>
          <div className='w-full '>
              {/* <div
                  className="h-40 bg-slate-200 flex justify-center items-center rounded cursor-move"
                  draggable="true"

              >
                  <h1>drag-image...</h1>
              </div> */}
               <FormField
              control={form.control}
              name="images"
              render={({ field, formState }) => (
              <FormItem>

              <FormLabel>Promotion Image</FormLabel>
              <FormControl>
              <Uploader onChange={(image) => form.setValue("images", image)} />
              </FormControl>
              {formState.errors.images && (
                <FormMessage error={formState.errors.images.message} />
              )}
              </FormItem>
              )}
              />

              <div className=''>
                  <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
              <FormItem>
              <FormControl>
                  <Input type="text" disabled={loading} className='mt-5 mb-5' placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
          )}
          />
              </div>
          </div>

      </div>
      <div className='float-right flex gap-2 justify-end'>
          <Button type="submit" >Save</Button>
      </div>
      </form>
    </Form>
    </>
  )
}