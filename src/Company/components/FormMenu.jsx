import React from 'react'
import { Input } from '../../components/ui/input'
import ComboboxDemo from '../../components/custom/combobox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GrCurrency } from "react-icons/gr";

const FormMenu = () => {
  return (
    <div className=' w-full p-5 h-auto border m-5 rounded-md bg-white' >
      <h1 className='border-b-2'>About</h1>
      <div className=''>
        <div className='flex flex-col md:flex-row w-full py-5 gap-5 items-center'>
          <div className='w-full md:w-1/2'>
            <label className=''>Name :</label>
            <Input className='mt-3' placeholder='name' type="text"/>
          </div>
          <div className='w-full md:w-1/2'>
            <label className='block mb-3'>Logo :</label>
            <Input id="example1" type="file" class="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-neutral-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
          </div>
        </div>
        <div className='flex flex-col md:flex-row w-full  gap-5 items-center'>
          <div className='w-full md:w-full'>
            <label className='block mb-3'>Description :</label>
            <Input className='mt-3' placeholder='description' type="text"/>
          </div>
        </div>
        <div className='w-full md:w-full'>
            <label className='block mb-3'>Cover Photo :</label>
            <Input id="example1" type="file" class="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-neutral-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />

          </div>
          <div className='w-full md:w-full'>
            <label className='block mb-3'>Adress :</label>
            <Input className='mt-3' placeholder='Adress' type="text"/>
          </div>
        <div className='flex flex-col md:flex-row w-full py-5 gap-5 items-center'>
          <div className='w-full md:w-1/2'>
            <label className='block mb-3'>Currency :</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Méthode de paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Méthode de paiement</SelectLabel>
                  <SelectItem value="card">Carte de crédit</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="cash">Espèces</SelectItem>
                  <SelectItem value="transfer">Virement bancaire</SelectItem>
                  <SelectItem value="crypto">Crypto-monnaie</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='w-full md:w-1/2'>
            <label className='block mb-3'>Wifi password :</label>
            <Input id="picture" type="text" className='mt-3' placeholder="wifi"/>
          </div>
        </div>
        <div>
            <label for="example7" className="mb-1 block text-sm font-medium text-gray-700">Website</label>
            <div className="relative z-0 flex">
                <div className="inset-y-0 left-0 flex items-center rounded-md rounded-r-none border border-r-0 border-gray-300 bg-gray-100 px-2.5 text-gray-700">https://</div>
                <Input type="url" id="example7" className="block w-full rounded-md rounded-l-none border border-gray-300 shadow-sm focus:z-10 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="example.com" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default FormMenu;
