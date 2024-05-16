import React from 'react'
import { Input } from '../../components/ui/input'
import ComboboxDemo from '../../components/custom/combobox'

const FormLocation = () => {
  return (
    <div className='grid '>
    <div className=' w-full p-5 h-auto  border mx-5 mt-5 rounded-md bg-white'>
      <h1 className='border-b-2'>Location</h1>
      <div className='flex flex-col md:flex-row w-full pt-5 gap-5 items-center'>
          <Input  className='mt-3' placeholder='Trustpilot' />
          <Input  className='mt-3' placeholder='Google Business' />
      </div>
    </div>
     <div className=' w-full p-5 h-auto  border m-5 rounded-md bg-white'>
     <h1 className='border-b-2'>Tracking</h1>
     <div className='flex flex-col md:flex-row w-full py-5 gap-5 items-center'>
          <div className='w-full md:w-1/2'>
            <label className=''>Google analytics :</label>
            <Input className='mt-3' placeholder='Google analytics' type="text"/>
          </div>
          <div className='w-full md:w-1/2'>
            <label className='block mb-3'>Facebook Pixel :</label>
            <Input className='mt-3' placeholder='Facebook Pixel' type="text"/>
            </div>
        </div>
        <div className='flex flex-col md:flex-row w-full  gap-5 items-center'>
          <div className='w-full md:w-full'>
            <label className='block mb-3'>Google ads Pixel :</label>
            <Input className='mt-3' placeholder='Google ads Pixel' type="text"/>
          </div>
          <div className='w-full md:w-full'>
            <label className='block mb-3'>Tiktok pixel :</label>
            <Input className='mt-3' placeholder='Tiktok pixel' type="text"/>
          </div>
        </div>
     </div>
   </div>


  )
}

export default FormLocation
