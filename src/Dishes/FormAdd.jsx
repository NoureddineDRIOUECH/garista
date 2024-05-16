import React, {useState} from 'react'
import Uploader from "./uploader";
import { useForm } from "react-hook-form";
import { union, z } from "zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
export const FormAdd = ({ initialData, categories, selectedCategoryId, handleAdded, handleImageUpdate, handleUpdate }) => {
  const MAX_FILE_SIZE = 2000000;

  console.log('The Categories => ', initialData);
  const formSchema = z.object({
    name: z.string().min(1, 'Title is required'),
    image:  initialData
    ? z.optional(
        z.union([z.string(), z.instanceof(File)])
      )
      .refine((file) => typeof file === 'string' || (file instanceof File && file.size <= MAX_FILE_SIZE), `Max image size is 2MB.`)
      .optional()
    : z.optional(z.instanceof(File))
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
      .optional(),
    desc: z.string().min(1,'Description is required'),
    price: z.coerce.number().min(1,'Price is required'),
    category_id: z.string().min(1,'Select a Category'),
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
      const title = initialData ? 'Edit dishe' : 'Create dishe';
      const description = initialData ? 'Edit a product.' : 'Add a new product';
      const toastMessage = initialData ? 'Dishe updated.' : 'Dishe created.';
      const action = initialData ? 'Save changes' : 'Create';
      const defaultValues = initialData ? {
        ...initialData,
      } : {
        name: '',
        // image: null,
        desc: '',
        price: 0,
        category_id: '',
      };
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          ...defaultValues,
          category_id: selectedCategoryId,        },
      }); 

      
    const onSubmit = async (data) => {
    if (initialData){
      if( typeof data.image != 'string') {
      // handleImageUpdate(data.image)
      console.log('Data Image ',data)
      handleImageUpdate({newImage: data.image, id: initialData.id})
     }
     console.log('Data in update :',data)
     handleUpdate({data, toastMessage,id: initialData.id });

}else{
  console.log('Data in add :',data)
    handleAdded(data, toastMessage);
  }
};
  return (
    <>
    <div className="flex items-center justify-between">
        {/* <Heading title={title} description={description} /> */}

      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
          <div className="flex items-start gap-10 p-10">
          {/* <div className=' '> */}
          <div className='w-full '>

          <FormField
          control={form.control}
          name="image"
          render={({ field, formState }) => (
            <FormItem>

      <FormLabel>Dish Image</FormLabel>
          <FormControl>
          <Uploader initalData={initialData}
          //  onChange={(image) => form.setValue("image", image)}
          onChange={(image) => {
            // Update form value for the image field
            form.setValue("image", image);
          }} 
            getvalue={form.getValues('image')}/>
          </FormControl>
          {formState.errors.image && (
            <FormMessage error={formState.errors.image.message} />
          )}
          </FormItem>
                )}
        />
                  <div className=''>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>

                        <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" disabled={loading} className='mt-5 mb-5' placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                      <FormField
  control={form.control}
  name="category_id"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <Select disabled={loading} onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue defaultValue={selectedCategoryId} placeholder={initialData ? form.getValues("categorie")?.name : "Select Category"} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {categories.map((item, index) => (
            <SelectItem key={index} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

                  </div>
            </div>
            <div className='w-full'>
                            <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                        <FormItem>

                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea className='mt-5 mb-5 border p-2 min-h-[100px] max-h-[200px]' placeholder='Description' cols={48} rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Normal Price</FormLabel>
                        <FormControl>
                        <Input type="text" className='mt-5 mb-5' disabled={loading} placeholder="Normal Price" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                    />
              </div>
              </div>
              <div className='float-right flex gap-2 items-center '>
              <Button type="submit" className='border px-4 py-2 rounded bg-black text-white hover:bg-zinc-600 duration-1000' >Confirm</Button>
              </div>

          </form>
          
      </Form>
    </>
  )
}