/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5BImudj7bMN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from 'react'
import {Link} from "react-router-dom"
import { IoIosReturnLeft } from "react-icons/io";
import { FaFacebook ,FaInstagram,FaTiktok,FaSnapchat,FaYoutube,FaWifi} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ScrollArea } from "@/components/ui/scroll-area"
import { CgEye } from "react-icons/cg";
import { HiWifi } from "react-icons/hi";
import Spinner from 'react-spinner-material';
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export default function Info({
    items, 
    infoRes
}) 
{
    if(!infoRes)
        {
            return(
                <div className='justify-center items-center flex  h-screen'>
                <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
              </div>
              )
        }
  return (
<>
<div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-6">
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md p-8">
    <div className="flex flex-col items-center">
      <img
        alt="Restaurant Logo"
        className="rounded-full mb-4"
        height={80}
        src="./logo.webp"
        style={{
          aspectRatio: "80/80",
          objectFit: "cover",
        }}
        width={80}
      />
      <h1 className="text-2xl font-bold mb-2">Info</h1>
      <div className="flex space-x-4 mb-6">
            <Link to={infoRes.facebook} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" >
              <TwitterIcon className="w-6 h-6" />
            </Link>
            <Link to={infoRes.instgram} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" >
              <InstagramIcon className="w-6 h-6" />
            </Link>
            <Link to={infoRes.snapshat} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" >
              <FacebookIcon className="w-6 h-6" />
            </Link>
            <Link className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" >
              <YoutubeIcon className="w-6 h-6" />
            </Link>
            <Link className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" >
              <YoutubeIcon className="w-6 h-6" />
            </Link>
            <Link className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" >
              <InstagramIcon className="w-6 h-6" />
            </Link>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 w-full mb-6">
            <h2 className="text-lg font-bold mb-2">WiFi Password</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Noureddine@/localhost</span>
              <div className="flex space-x-2">
                <Button className="rounded-full" size="icon" variant="ghost">
                  <CopyIcon className="w-5 h-5" />
                  <span className="sr-only">Copy WiFi Password</span>
                </Button>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <QrCodeIcon className="w-5 h-5" />
                  <span className="sr-only">Generate QR Code</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <PhoneIcon className="w-5 h-5" />
            <span>+1 439320{infoRes.phone}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 w-full mb-6">
            <h2 className="text-lg font-bold mb-2">Menu</h2>
            <Link 
              className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
             
            >
              <span>View Menu</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 w-full mb-6">
            <h2 className="text-lg font-bold mb-2">Hours</h2>
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <span>Monday - Friday</span>
              <span>11am - 9pm</span>
            </div>
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <span>Saturday - Sunday</span>
              <span>12pm - 10pm</span>
            </div>
          </div>
          
          
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 w-full mb-6">
            <h2 className="text-lg font-bold mb-2">Language</h2>
            <Select defaultValue="en">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>

    </>
  )
}
function ArrowRightIcon(props) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}



function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}



function CopyIcon(props) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}


function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function QrCodeIcon(props) {
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
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}


function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


function YoutubeIcon(props) {
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
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}