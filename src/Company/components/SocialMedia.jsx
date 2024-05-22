import React from 'react'
import { Input } from '../../components/ui/input'
import { FiInstagram } from 'react-icons/fi'
import { FaFacebookSquare, FaTiktok } from 'react-icons/fa'

const SocialMedia = () => {
    return (
        <div className='p-5 border m-5 rounded-md bg-white'>
            <h1 className='border-b-2'>Social Media</h1>
            <div>
                <div className='flex items-center m-5'>
                    <FiInstagram className='w-10 h-10 text-gray-500' />
                    <Input className='m-5 w-[16rem]' placeholder='Instagram Account...' />
                </div>
                <div className='flex items-center m-5'>
                    <FaFacebookSquare className='w-10 h-10 text-gray-500' />
                    <Input className='m-5 w-[16rem]' placeholder='Instagram Account...' />
                </div>
                <div className='flex items-center m-5'>
                    <FaTiktok className='w-10 h-10 text-gray-500' />
                    <Input className='m-5 w-[16rem]' placeholder='Instagram Account...' />
                </div>

            </div>
        </div>
    )
}

export default SocialMedia
