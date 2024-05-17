import React, { createContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormAdd } from './FormAdd';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import TabsDemo from '../../components/custom/tabs';
import QrCodeTemplate from './QrCodeTemplate';
import TabsDemoCustom from './TabsDemoCustom';
import { FaUserCircle } from "react-icons/fa";
import UpdateForm from './updateForm';
import { MdErrorOutline } from "react-icons/md";
import DeleteForm from './deleteForm';
import { UserCard } from './UserCard';
import { useEffect } from 'react';
import { getRoles } from '../../../actions/Role/getRoles';
import { toast } from "react-hot-toast";
import { axiosInstance } from '../../../axiosInstance';
import Spinner from 'react-spinner-material';

export const UserContext = createContext();

function AddQrCode() {
    const { state } = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const { names } = state == null ? "tes" : state.value;

    console.log("qr",names)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const idUser = sessionStorage.getItem('dataItem');

    const handleDialogClose = () => {
      setIsDialogOpen(false);
    };
    
    const handleDialogOpen = () => {
      setIsDialogOpen(true);
    };
    const [user, setUser] = useState([]);
    const [role,setRole] = useState("");
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(false)
    const [resotInfo, setRestoInfo] = useState([]) 
    const [tableNames, setTableNames] = useState([]);
    const [usersList, setUsersList] = useState([]);
       const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };
    const fetchUser = async (id) => {
        setLoading(true);
        try{
            const res = await axiosInstance.get('/api/getStaffByResto/'+id)
            if(res)
            {
                console.log("The Data reutned => ", res);
                setUsersList(res.data)
            }
        }
        catch(err)
        {
            console.log("The Error => ",err);
        }
        finally{
            setLoading(false);
        }
      }
    useEffect(() => {
      const fetchValues = async () => {
        try{
            const restoInfo = sessionStorage.getItem('RestoInfo');
             let Data = [];
             Data = JSON.parse(restoInfo)
             Data.map(item => {
                setRestoInfo(item)
                fetchUser(item.id)
             })
           const res = await getRoles();
           if(res)
           {
            console.log("The Result => ", res);
            setRoles(res)
           }

        }
        catch(err)
        {
            console.log("The error => ",err);
        }
      }

      fetchValues()
    }, [])

    console.log("The Data => ", resotInfo.id);
    const handleData = async ({
        data,
        toastMessage
    }) => {
        try {
            setLoading(true);

             const res =  await axiosInstance.post(`/api/staffs`, {
                  "first_name": data.first_name,
                  "last_name": data.last_name,
                  "email": data.email,
                  "password": data.password,
                  "phone": data.phone,
                  "username": data.username,
                  "role_id": parseInt(data.role_id),
                  "resto_id": resotInfo.id,
                  "user_id": idUser
              });
              if(res)
              {
                  console.log("The Added => ", res);
                  handleDialogClose()
                //   fetchUser();
                //   toast.success(toastMessage);
                }
                
        } catch (error) {
            console.log("The Error => ",error);
        }finally{
            toast.success(toastMessage);
            fetchUser(resotInfo.id);
          } 
          
    }


    const handleUpdate = async ({
        data,
        toastMessage,
        id
    }) => {

        try {
            // setLoading(true);

             const res =  await axiosInstance.put('/api/staffs/'+id, {
                first_name : data.first_name,
                last_name : data.last_name,
                password : data.password,
                phone : data.phone,
                email : data.email,
                // username : data.username,
                role_id : parseInt(data.role_id),
             } 
             );
              if(res)
              {
                  console.log("The Added => ", res);
                  handleDialogClose()
                //   fetchUser();
                //   toast.success(toastMessage);
                }
        } catch (error) {
            console.log("The Error => ",error);
        }finally{
            toast.success(toastMessage);
            fetchUser(resotInfo.id);
          } 
          
    }



    const handleDelete= async ({
        id,
        toastMessage
    }) => {
        try {
            setLoading(true);

             const res =  await axiosInstance.delete(`/api/staffs/${id}`);
              if(res)
              {
                  console.log("The Added => ", res);
              }
                            //   router.push(`/dashboard/products`);
        } catch (error) {
            console.log("The Error => ",error);
        }finally{
            toast.success(toastMessage);
            fetchUser(resotInfo.id);
          } 
    }


    return (
        <>
        {
            loading 
            ?
            <div className='justify-center items-center flex  h-[50vh]'>
             <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
            </div>
            :
            <>
            <div className='grid grid-cols-6 gap-5'>
                   {usersList.length > 0 && usersList.map((user, index) => (
                       <UserCard key={index} handleDelete={handleDelete} handleUpdate={handleUpdate} usersList={user}/>
                   ))}

                     <Card onClick={handleDialogOpen} className="w-[250px] cursor-pointer h-[280px] border-dashed grid place-content-center">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-lg">Add managers or waiters for your restaurant</CardTitle>

                                </CardHeader>
                                <CardContent>
                                    {/* {tableNames.map((tableName, index) => (
                                        <div key={index}>{tableName.nom}</div>
                                    ))} */}
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
                                            onClick={handleDialogOpen}
                                        >
                                            <MdAddBox size={50} style={{ color: '#000' }} />
                                        </button>
                                    </UserContext.Provider>
                                </CardContent>
                    </Card>
                    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                        {/* <DialogTrigger>

                        </DialogTrigger> */}
                        <DialogContent className="max-w-[50rem]">
                        <DialogHeader>
                                <FormAdd loading={isLoading} roles={roles} handleData={handleData}/>
                        </DialogHeader>

                        </DialogContent>
                    </Dialog>
                    </div>
                </>
            }
        </>

    );
}

export default AddQrCode;