import React from 'react'
import { RiMessage2Fill } from "react-icons/ri";
import { GiStarsStack } from "react-icons/gi";
import { PiCallBellFill } from "react-icons/pi";
import { FaFacebook,FaInstagram,FaSnapchat,FaInfoCircle,FaHome,FaShoppingCart} from "react-icons/fa";

import {Link} from "react-router-dom"
function Footer({
    slug,
    table_id
}) {

    console.log("The Slug => ", slug);
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
    <Link to={`/theme/${slug}?table_id=${table_id}`} className='inline-flex '>
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FaHome size={20} className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#28509E] dark:group-hover:text-[#28509E]"/>
        </button>
    </Link>
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
           <GiStarsStack size={20} className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#28509E] dark:group-hover:text-[#28509E]"/>
        </button>
        <Link to={`/theme/${slug}/Claims?table_id=${table_id}`} className='inline-flex'>
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <RiMessage2Fill size={20} className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#28509E] dark:group-hover:text-[#28509E]"/>
        </button>
        </Link>
        <Link to={`/theme/${slug}/Achat?table_id=${table_id}`} className='inline-flex'>
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
           <FaShoppingCart size={20} className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#28509E] dark:group-hover:text-[#28509E]"/>
        </button>
        </Link>
        <Link to={`/theme/${slug}/info?table_id=${table_id}`} className='inline-flex '>
        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FaInfoCircle size={20} className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#28509E] dark:group-hover:text-[#28509E]"/>
        </button>
        </Link>
    </div>
    
</div>
  )
}

export default Footer