import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AddQrCode from './components/AddQrCode';
import { Button } from "../components/ui/button";
import { MdRestaurantMenu } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import UserNav from "../pages/dashboard/components/user-nav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";

const Users = () => {
    const defaultPageURL = "https://votre-domaine.com/page-par-defaut";
    const [names, setNames] = useState("");
    const [tableNames, setTableNames] = useState([]);

    const memoizedTableNames = useMemo(() => tableNames, [tableNames]);

    const updateTableNames = (newTableNames) => {
        setTableNames(newTableNames);
    };

    const addToTableNames = () => {
        updateTableNames([...tableNames, { nom: names }]);
        setNames("");
    };

    return (
        <>
            <div className="border-b ">
                <div className="flex h-16 items-center px-4">
                    <div className="ml-auto flex items-center space-x-8" dir="rtl">
                        <UserNav />
                        <div className="w-1"></div>
                        <Dialog>
                            <DialogTrigger className="flex justify-center">
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full ">
                                    <FaLink size={22} />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle style={{ display: "flex", alignItems: "center" }}>
                                        <span style={{ marginRight: "0.5rem" }}>Your Menu</span>{" "}
                                        <MdRestaurantMenu size={20} />
                                    </DialogTitle>
                                    <DialogDescription>
                                        <div className="m-5 ml-10 flex mt-10 gap-10 ">
                                            <img className="w-19 h-19 m-auto"
                                                 src="https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4="
                                                 alt="" />
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex justify-center items-center">
                                    <a href={defaultPageURL} className="text-blue-500 hover:underline">
                                        {defaultPageURL}
                                    </a>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <AddQrCode tableNames={memoizedTableNames} />
            </div>
        </>
    );
}

export default Users;
