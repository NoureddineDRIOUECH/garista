/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5BImudj7bMN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from 'react'
import {Link} from "react-router-dom"
import Spinner from 'react-spinner-material';
import { Button } from "@/components/ui/button"
import { APIURL } from '../../../lib/ApiKey';
import { BsFillTelephoneFill } from "react-icons/bs";
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaFacebook ,FaInstagram,FaTiktok,FaSnapchat,FaYoutube,FaWifi} from "react-icons/fa";

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
        src={`${APIURL}/storage/${infoRes.logo}`}
        style={{
          aspectRatio: "80/80",
          objectFit: "cover",
        }}
        width={80}
      />
      <h1 className="text-2xl font-bold mb-2">{items.name}</h1>
      <div className="flex flex-wrap justify-center mb-6">
        {[
          { icon: FaFacebook, link: infoRes.facebook },
          { icon: FaInstagram, link: infoRes.instgram },
          { icon: FaTiktok, link: infoRes.tiktok },
          { icon: FaSnapchat, link: infoRes.snapshat },
          { icon: FaYoutube, link: infoRes.youtube },
        ].map((item, index) => (
          <div key={index} className="w-10 h-10 rounded-full border border-1 border-grey/50 grid place-content-center mx-2 mb-2">
            <Link to={item.link} target="_blank">
              <item.icon size={25} className="text-grey/50" color="grey/50" />
            </Link>
          </div>
        ))}
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
      <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-4">
        <PhoneIcon className="w-5 h-5" />
        <span> +212 {infoRes.phone}</span>
      </div>
      <div className="mt-4">
        <p className="text-gray-500 dark:text-gray-400 px-2">{infoRes.description}</p>
      </div>
    </div>
  </div>
</div>

    </>
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


