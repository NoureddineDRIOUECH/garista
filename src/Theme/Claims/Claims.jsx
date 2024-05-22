import React from 'react'
import { Button } from '../../components/ui/button'
import { axiosInstance } from '../../../axiosInstance';
import { useState } from 'react';

function Claims({
  items
}) {

  const [desc, setDesc] = useState('')

  const handleClaim = async () => {
    try{
      const res = await axiosInstance.post('/api/claims',{
        description: desc,
        resto_id: items.id,
        clamer_name: "Younes"
      })

      if(res)
      {
        console.log("Return Sucessfully");
      }
    }
    catch(err)
    {
      console.log("The Error => ", err);
    }
  }
  return (
   <div className="container mt-8">
   
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Make A <span class="underline underline-offset-3 decoration-8 decoration-[#28509E] dark:decoration-blue-600">Claims</span></h1>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            <div className='pt-16'>
                <label for="message" class="block mb-2 text-lg font-bold text-gray-900 dark:text-white">Your message</label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                <div className='flex gap-2 mt-4'>
                  <Button type="submit" onClick={handleClaim}>Save</Button>
              </div>
                    
            </div>


   </div>
  )
}

export default Claims