import React, { createContext, useState } from 'react';
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { FaUserCircle } from "react-icons/fa";
import UpdateForm from './updateForm';
import DeleteForm from './deleteForm';
export const UserCard = ({usersList,handleDelete, setIsDialogOpen, handleUpdate }) => {
    const [updateFormState, setUpdateFormState] = useState(false);
    const [deleteFormState, setDeleteFormState] = useState(false);
    const [position, setPosition] = useState("bottom")


  return (
    <div>

                    <Card className="w-full h-[280px] ">
                        <DropdownMenu className="flex justify-end ">
                            <DropdownMenuTrigger asChild className="flex justify-end ">
                                <Button className="flex justify-end " style={{backgroundColor:"white"}}><BiDotsVerticalRounded size={25} color='black'/></Button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-6">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <DropdownMenuItem onSelect={() => {setUpdateFormState(true)}}>Update</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setDeleteFormState(true)}>Delete</DropdownMenuItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <CardHeader className="flex text-center justify-end p-2">
                            <CardTitle>{usersList.first_name} {usersList.last_name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="m-5 flex gap-5 items-center flex-col">
                                <FaUserCircle size={100} className="w-14 h-14 m-auto"/>
                                <p>{usersList.role.name}</p>
                            </div>
                            <div className="justify-center text-zinc-500 text-center">{usersList.email}</div>
                        </CardContent>
                        <CardFooter className="justify-center"></CardFooter>
                    </Card>
                    <UpdateForm isDialogOpen={updateFormState} setIsDialogOpen={setUpdateFormState} id={usersList.id} handleUpdate={handleUpdate}/>
                    <DeleteForm deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} handleDelete={handleDelete} id={usersList?.id}/>
    </div>
  )
}