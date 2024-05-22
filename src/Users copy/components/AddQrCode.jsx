import React, { createContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import TabsDemo from '../../components/custom/tabs';
import QrCodeTemplate from './QrCodeTemplate';
import TabsDemoCustom from './TabsDemoCustom';
import { FaUserCircle } from "react-icons/fa";

export const UserContext = createContext();

function AddQrCode({props}) {
    const { state } = useLocation();

    const { names } = state == null ? "tes" : state.value;

    console.log("qr",names)

    const [user, setUser] = useState([{ nom: 'toto' },{ nom: 'titi' }]);
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [role,setRole] = useState(""); // État pour stocker le rôle sélectionné
    const [modalOpen, setModalOpen] = useState(false);

    const [tableNames, setTableNames] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [qrValue, setQrValue] = useState("");

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleAddUser = () => {
        const newUser = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            role: role // Utilisation de l'état du rôle sélectionné
        };

        setUsersList([...usersList, newUser]);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setRole("");
        console.log(usersList);
        setModalOpen(false);
    };

    return (
        <div className='flex gap-5'>

            {usersList.map((user, index) => (
                <div key={index}>

                                <Card className="w-[250px] h-[250px]">
                                    <CardHeader className="text-center">
                                        <CardTitle>{user.firstname} {user.lastname}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="m-5 ml-10 flex mt-0 gap-10 ">
                                            <FaUserCircle size={100} className="w-19 h-19 m-auto"/>
                                            <p>{user.role}</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter>{user.email}</CardFooter>
                                </Card>

                </div>
            ))}

            <Dialog >
                <DialogTrigger>
                    <Card className="w-[250px] h-[250px] border-dashed grid place-content-center">
                        <CardHeader className="text-center">
                            <CardTitle>Add a User</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {tableNames.map((tableName, index) => (
                                <div key={index}>{tableName.nom}</div>
                            ))}
                            <UserContext.Provider value={user}>
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        console.log('Icon clicked');
                                    }}
                                >
                                    <MdAddBox size={50} style={{ color: '#000' }} />
                                </button>
                            </UserContext.Provider>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent className="max-w-[50rem]">
                    <DialogHeader>
                        <DialogTitle>Add a new User</DialogTitle>
                        <DialogDescription >Create a new user Lorem ipsum dolor sit amet consectetur </DialogDescription>
                        <div className="flex flex-col gap-3 items-center justify-center pt-4">
                            <div className="flex gap-3">
                                <Input type="text" placeholder="First name" className="w-72 p-2 border border-gray-300 rounded-md" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                <Input type="text" placeholder="Last name" className="w-72 p-2 border border-gray-300 rounded-md" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div className="flex gap-3">
                                <Input type="text" placeholder="Email" className="w-72 p-2 border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input type="text" placeholder="Phone" className="w-72 p-2 border border-gray-300 rounded-md" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="flex gap-3">
                            <Select value={role} onChange={(e) => handleRoleChange(e.target.value)}>
    <SelectTrigger className="w-[37rem]">
        <SelectValue placeholder="Role" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="owner">Owner</SelectItem>
        <SelectItem value="waiter">Waiter</SelectItem>
        {/* Ajoutez d'autres rôles ici si nécessaire */}
    </SelectContent>
</Select>

                            </div>
                            <DialogClose>
                                <Button variant="outline" className="justify-end items-end" onClick={handleAddUser}>Add User</Button>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddQrCode;
