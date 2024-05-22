/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nWlsU2cNRzR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import React from 'react'
import { Button } from '../../components/ui/button'
import { axiosInstance } from '../../../axiosInstance';
import { useState } from 'react';
import {Textarea} from "@/components/ui/textarea.jsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Loader} from "lucide-react";
import {toast, Toaster} from "sonner";
// zod shcema 
// const phoneRegex = new RegExp(
//   /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
// );
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";
import { useRef } from "react";
const formSchema = z.object({
  clamer_name: z.string().optional(),
  description: z.string().min(1,'Message is Required').max(500),
  infos :  z.optional(z.string()),
});

export default function Claims({
    items
  }) 
  {

    const searchInputRef = useRef(null);

    useEffect(() => {
      if (searchInputRef.current) {
        searchInputRef.current.blur(); // Ensure the input is not focused on mount
      }
    }, []);
    const [orderSuccessModalOpen, setOrderSuccessModalOpen] = useState(false); 
    const [desc, setDesc] = useState('')
    const [clamer_name, setClamer_name] = useState('')
    const [anonymChecked, setAnonymChecked] = useState(false); 
    const [disabled, setDisabled] = useState(false); 
    const toggleDisabled = () => {
      setAnonymChecked(!anonymChecked); // Toggle checkbox state
      setDisabled(!disabled); // Toggle disabled state
    };

    const alertToast = async (setOrderSuccessModalOpen) => {
      return(
        <AlertDialog open={orderSuccessModalOpen} onOpenChange={setOrderSuccessModalOpen}>
        <AlertDialogContent className="w-[80%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Your claim has been successfully submitted</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your Claim!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction autoFocus onClick={() => setOrderSuccessModalOpen(!orderSuccessModalOpen)}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      )
    }
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues:{
        clamer_name: '',
        infos: '',
        description: '',
        anonymCheckBox: false,
      }
    })
    const {setError, formState: {isSubmitting}, reset} = form
    const onSubmit = async (data) => {
      // console.log('the sent is =>',data)
      try {

          // If the checkbox is checked, send only the description
          const res = await axiosInstance.post('/api/claims', {
            description: data.description,
            clamer_name : data.clamer_name == '' ? "Annonymos" : data.clamer_name,
            email : data.infos == '' ? null : data.infos,
            resto_id: items.id
          });
          if (res) {
            reset();
            console.log("Return Successfully");
            // toast.success('Event has been created');
            const notification = {
              title: "New Claim",
              status: "Claim",
              resto_id: items.id
            };
            const responseNotification = await fetch(`https://backend.garista.com/api/notifications`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
            },
              body: JSON.stringify(notification)
            });
            setOrderSuccessModalOpen(true);
          }

      } catch (err) {
        console.log('The err =>', err);
        Object.entries(response.data.errors).forEach((error) => {
          const [fieldName, errorMessages] = error;
          setError(fieldName, {
            message: errorMessages.join()
          });
        });
      }
    };
    
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
  <div className="w-full max-w-md p-6 bg-white rounded-lg dark:bg-gray-800 h-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Make A <span className="underline underline-offset-3 decoration-8 decoration-[#28509E] dark:decoration-blue-600">Claims</span></h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                <SmileIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Tell us about your recent experience at our restaurant.</p>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
              <FormField
          control={form.control}
          name="clamer_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name (optional)</FormLabel>
              <FormControl>
                <Input ref={searchInputRef} placeholder="Enter your name" disabled={disabled} {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
              </div>
              <div className="space-y-2">
              <FormField
          control={form.control}
          name="infos"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email or phone(optional)</FormLabel>
              <FormControl>
                <Input ref={searchInputRef} placeholder="Email or phone...." disabled={disabled} {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
              </div>
              <div className=" col-span-2">
              <FormField
          control={form.control}
          name="anonymCheckBox"
          render={({ field }) => (
            <FormItem className="flex border-0 flex-row items-start space-x-2 space-y-0 rounded-md mb-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => { field.onChange(value); toggleDisabled(); }}
                />
              </FormControl>
              <div className="leading-none">
                <FormLabel>
                Submit feedback anonymously
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
              </div>
            </div>
            <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Textarea
                ref={searchInputRef}
                  value={desc} onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  placeholder="Write your thoughts here..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
            <div className="flex items-center justify-between">
              <Button
                className="px-4 py-2 my-4 font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-offset-gray-800"
                type="submit"
                // onClick={handleClaim}
                disabled={isSubmitting}
              >
                  {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '}Submit Feedback
              </Button>
            </div>
          </form>
          </Form>

          <AlertDialog open={orderSuccessModalOpen} onOpenChange={setOrderSuccessModalOpen}>
        <AlertDialogContent className="w-[80%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Your claim has been successfully submitted</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your Claim!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction autoFocus onClick={() => setOrderSuccessModalOpen(!orderSuccessModalOpen)}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </div>
      </div>
    </div>
    </>
  )
}

function SmileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}