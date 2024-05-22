import React from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import UpdateForm from './updateForm'
import DeleteForm from './deleteForm'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useState } from 'react'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { APIURL } from "../../../lib/ApiKey";
import { EditIcon, TrashIcon } from 'lucide-react'

const CategorieCard = ({item, handled, handleUpdate}) => {
    const [position, setPosition] = useState("bottom")
    const [updateFormState, setUpdateFormState] = useState(false);
    const [deleteFormState, setDeleteFormState] = useState(false);
    // let imageUrls = [];
    // imageUrls = JSON.parse(item.image);
  return (
    <div>

    <Card className='w-full h-[280px] m-0 mb-0'>
    {/* <DropdownMenu className="flex justify-end !left-[150px]">
                <DropdownMenuTrigger asChild >
                    <Button className="flex justify-end bg-white " style={{backgroundColor:"white"}}><BiDotsVerticalRounded size={25} color='black'/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-6 !left-[150px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className='pl-2 gap-2 flex flex-col'>
                        <DropdownMenuItem className='hover:border-none hover:outline-none cursor-pointer' onSelect={() => setUpdateFormState(true)}>Update</DropdownMenuItem>
                        <DropdownMenuItem className='hover:border-none hover:outline-none cursor-pointer' onSelect={() => setDeleteFormState(true)}>Delete</DropdownMenuItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu> */}
            <div className='p-2 '>
                <div className='flex items-center gap-2'>
                    <Button onClick={() => setDeleteFormState(true)} size="icon" variant="outline" className="bg-red-100 border-transparent">  
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </Button>
                    <Button onClick={() => setUpdateFormState(true)} size="icon" variant="outline" className="bg-blue-100 border-transparent">
                      <EditIcon className="w-4 h-4 text-blue-500" />
                    </Button>
                </div>
            </div>
    <CardContent className=' m-5 rounded-full h-40' >
         <div className='py-2 px-3 h-40 rounded-full gap-3'>
            <div className='grid justify-center items-center'>
                {/* <div className="row-span-3 h-[9rem] w-[9rem] rounded-full bg-[url('data:image/jpeg;base64,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')] object-contain " >
                </div> */}
                {/* <div className="col-span-2 pl-[0.2rem]"> */}
                    {/* <img className=' w-[6.5rem]' src="data:image/jpeg;base64,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" alt="" /> */}
                    {/* <img src={`http://localhost:8000/${imagUrls}`} alt="Item" className="row-span-3 h-[9rem] w-[9rem] rounded-full" /> */}
                    {/* {imageUrls.map((imageUrl, index) => ( */}
                        <img  src={`${APIURL}/storage/${item.image}`}  className="h-[5rem] w-[5rem] rounded-full object-cover"  alt={`Image ${item.name}`} />
                    {/* ))} */}
                {/* </div> */}
                {/* <div className='row-span-2 col-span-2 pl-[0.2rem]'>
                    <img className='rounded-br-full w-[6.5rem]' src="data:image/jpeg;base64,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" alt="" />
                </div> */}

            </div>

        </div>
        <div className='text-center text-xl font-light text-zinc-500 '>{item.name}</div>

        </CardContent>

        </Card>
        <UpdateForm isDialogOpen={updateFormState} setIsDialogOpen={setUpdateFormState} id={item?.id} handleUpdate={handleUpdate}/>
        {/* <DeleteForm deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} handleDelete={handled}/> */}
        <DeleteForm deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} handleDelete={handled} id={item?.id}/>

    </div>
  )
}

export default CategorieCard