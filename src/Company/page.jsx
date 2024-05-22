import FormContact from './components/FormContact'
import FormLocation from './components/FormLocation'
import FormMenu from './components/FormMenu'
import SocialMedia from './components/SocialMedia'
import React from 'react'

import { Button } from "./../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./../components/ui/avatar";
import { MdRestaurantMenu } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import UserNav from "../pages/dashboard/components/user-nav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./../components/ui/dialog";

const company = () => {
    const defaultPageURL = "https://votre-domaine.com/page-par-defaut";
  return (
    <div>
 
      <h1 className='text-center p-3'>No banner present you have not yet set up a banner for your company. Click here to add an image.</h1>
      {/* <div className='h-20  bg-slate-300 m-5 rounded-lg'>
      </div> */}
      <div className='grid grid__content gap-6'>
        <FormMenu />
        {/* <FormContact /> */}
      </div>
      <div className='grid grid__content gap-6'>
        <FormLocation />
        <SocialMedia />
      </div>
    </div>
  )
}

export default company
