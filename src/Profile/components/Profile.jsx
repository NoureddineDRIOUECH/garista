import React from 'react'
// import { Input } from '../../components/ui/input'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { ComboboxLanguage } from './custom/language'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger, 
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '../../components/ui/button'
const Profileform = () => {
    return (
        <div className='p-5 border m-5 rounded-[15px] w-full bg-white'>
            <h1 className='border-b-2 '>Profile</h1>
            <div className='w-full flex items-center gap-5 pt-4'>
                <div className='w-full'>
                    <label >First name:</label>
                    <Input  className='my-3' placeholder='first name...'/>
                </div>
                <div className='w-full'>
                    <label>Last name :</label>
                    <Input className='my-3' placeholder="last name..."/>
                </div>


            </div>
            <div className='w-full flex items-center gap-5 '>
                <div className='w-full'>
                    <label >Email:</label>
                    <Input  className='my-3' placeholder='example@gmail.com'/>
                </div>
                <div className='w-full'>
                    <label>Mobile:</label>
                    <Input className='my-3' placeholder="0675162919"/>
                </div>


            </div>
            <div className='w-full '>
            <label className='block mb-3'>Language menu :</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Langues" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Langues</SelectLabel>
                  <SelectItem value="english">Anglais</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="spanish">Espagnol</SelectItem>
                  <SelectItem value="german">Allemand</SelectItem>
                  <SelectItem value="chinese">Chinois</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full ">
          <label className='block mb-3 pt-3'>Description :</label>
                <textarea className="w-full h-40 border rounded-md px-3 py-2" placeholder="Enter your text here..."></textarea>
            </div>
            <div className=" w-full ">
            <label className='block mb-3'>Picture :</label>
            <Input id="picture" type="file" />
            </div>
            <div className=" w-full p-4 justify-end">
            <Button>Save</Button>
            </div>


        </div>
    )
}

export default Profileform
