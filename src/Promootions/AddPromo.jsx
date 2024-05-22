import React,{useState} from "react"

  import { Input } from "@/components/ui/input"
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
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
import { Controller } from "react-hook-form"
import { DialogClose } from "../components/ui/dialog"
import { useEffect } from "react"
import { FormAdd } from "./FormAdd"
export const AddPromo = ({
    onSubmit,
    handleSubmit,
    register,
    handleImageChange,
    errors,
    file,
    fileName,
    control,
    handleDelete
}) => {


  return (
    
    <Dialog  className=" p-8 shadow-lg h-[45rem] w-[65rem] rounded-xl">
    <DialogTrigger className="flex justify-center">
            <Button variant="ghost" className="relative  rounded-md bg-black text-white">
          Add Promo
            </Button>
    </DialogTrigger>
    <DialogContent style={{ padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', height: '45rem', width: '35rem', maxWidth: '80rem', borderRadius: '1rem' }}>
        <DialogHeader className="flex justify-center">
                {/* <h2 className="text-2xl font-bold mb-4 text-center">Create Promotions</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex items-start gap-10 p-10 justify-center'>
                      <div className='w-full '>
                      <div className={`flex flex-col justify-center items-center border-[2px] border-dashed h-[250px] cursor-pointer rounded-[5px] w-full ${errors.file  ? 'border-red-500 ' : 'border-black'}`} onClick={() => document.querySelector(".input-field").click()}>
                        <input
                              type="file"
                              accept='image/*'
                              // className={`input-field`}
                              className='input-field h-full w-full'
                              {...register('image', { required: 'Please select a file.' })}
                              onChange={handleImageChange}
                              hidden
                          />

                          {file ? (
                              <img src={URL.createObjectURL(file)} width={150} height={150} alt={fileName} />
                          ) : (
                              <>
                                  <MdCloudUpload color={errors.file ? "red" : "black"} size={60} />
                                  <p className={`${errors.file ? "text-red-500" : "text-black"}`}>Browse Files to upload</p>
                              </>
                          )}

                      </div>

                      {
                          file ?
                          <section className='uploaded-row'>
                              <AiFillFileImage color='black' />
                              <span className='upload-content'>
                              {fileName} -
                              <MdDelete onClick={handleDelete} />
                              </span>
                          </section>
                          :
                          <></>
                      }

                          <div className=''>
                              <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Title is required' }}
                                render={({ field }) => (
                                    <>
                                        <Input type="text" placeholder="Title" className={`mt-5 mb-1 focus-visible:ring-white  border ${errors.name ? 'border-red-500 ' : 'border-gray-300'}`} {...field} />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                                    </>
                                )}
                            />
                          </div>
                      </div>

                  </div>
                  <DialogClose>
                    <div className='float-right flex gap-2 justify-end'>
                        <Button type="submit">Save</Button>
                    </div>
                  </DialogClose>
                </form> */}
                <FormAdd handleAdded={handleSubmit}/>
            </DialogHeader>
            <DialogFooter className="flex justify-center items-center">
        </DialogFooter>
    </DialogContent>
</Dialog>
  )
}



// export const AddPromo = ({ initialData, categories }) => {
//   const formSchema = z.object({
//     name: z.string().min(1),
//     images: z.object({ url: z.string() }).array(),
//     description: z.string().min(1),
//     price: z.coerce.number().min(1),
//     priceBig: z.coerce.number().min(1),
//     categoryId: z.string().min(1),
//   });
  
//   const ProductFormValues = z.infer;
  
//   const ProductFormProps = {
//     initialData: null,
//     categories: [],
//   };

//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [links, setLinks] = useState([]);
//   const [linkInput, setLinkInput] = useState("");
//   const title = initialData ? 'Edit product' : 'Create product';
//   const description = initialData ? 'Edit a product.' : 'Add a new product';
//   const toastMessage = initialData ? 'Product updated.' : 'Product created.';
//   const action = initialData ? 'Save changes' : 'Create';

//   const defaultValues = initialData ? {
//     ...initialData,
//     price: parseFloat(String(initialData?.price)),
//     priceBig: parseFloat(String(initialData?.priceBig))
//   } : {
//     name: '',
//     images: [],
//     description: '',
//     price: 0,
//     categoryId: '',
//     priceBig: 0
//   };

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues
//   });

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       if (initialData) {
//         await axios.patch(`/api/product/${params.productId}`, data);
//       } else {
//         await axios.post(`/api/product`, data);
//       }
//       router.refresh();
//       router.push(`/dashboard/products`);
//       toast.success(toastMessage);
//     } catch (error) {
//       toast.error('Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(`/api/dashboard/products/`);
//       router.refresh();
//       router.push(`/dashboard/products`);
//       toast.success('Product deleted.');
//     } catch (error) {
//       toast.error('Something went wrong.');
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   };

//   const addLink = (e) => {
//     e.preventDefault();
//     if (linkInput.trim() !== "") {
//       setLinks((prev) => [...prev, linkInput]);
//       setLinkInput("");
//     }
//   };

//   return (
//     <>
//       {/* <AlertModal 
//         isOpen={open} 
//         onClose={() => setOpen(false)}
//         onConfirm={onDelete}
//         loading={loading}
//       /> */}
//       <div className="flex items-center justify-between">
//         {/* <Heading title={title} description={description} /> */}
//         {initialData && (
//           <Button
//             disabled={loading}
//             variant="destructive"
//             size="sm"
//             onClick={() => setOpen(true)}
//           >
//             <Trash className="h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <Separator />
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-[750px] mx-auto">
// =
//                     <div className="md:grid md:grid-cols-1 gap-8">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input disabled={loading} placeholder="Product name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price for 30ML</FormLabel>
//                   <FormControl>
//                     <Input type="text" disabled={loading} placeholder="9.99" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="priceBig"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price for 50ML</FormLabel>
//                   <FormControl>
//                     <Input type="text" disabled={loading} placeholder="9.99" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control} 
//               name="categoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   {/* <Select disabled={loading} onValueChange={field.onChange}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue defaultValue={field.value} placeholder="Select a category" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select> */}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control} 
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   {/* <RichTextEditor
//                       value={field.value} // Pass your initial value here
//                       onChange={field.onChange}
//                     /> */}
//                     {/* <Textarea {...field} placeholder="text"/> */}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//           </div>  
//           <Button disabled={loading} className="ml-auto" type="submit">
//             {action}
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };


