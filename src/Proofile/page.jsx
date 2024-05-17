import React from 'react';

import {Link} from "react-router-dom"
import { FiInstagram } from 'react-icons/fi'
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare, FaTiktok ,FaSnapchatSquare,FaYoutube} from 'react-icons/fa'
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRolesById } from '../../actions/Role/getRoles';
import { getStaffById, getUserById } from '../../actions/User/CreateUser';
import Spinner from 'react-spinner-material';
import { axiosInstance } from '../../axiosInstance';
import { toast } from "react-hot-toast";
import { APIURL } from '../../lib/ApiKey';

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images."

export const iframeHeight = "1200px"

export const containerClassName = "w-full h-full"

export default function DashboardProfile() {

  const [userDat, setUserDat] = useState([])
  const [roleName, setRoleName] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [currentPassword, setCurrentPassword]= useState('')
  const [newPassword, setNewPassword]= useState('')
  const [confirmPassword, setConfirmPassword]= useState('')
  const idUser = sessionStorage.getItem('dataItem');
  const roleUser = sessionStorage.getItem('role');
  let role = JSON.parse(roleUser) 
  const [Loading, setLoading] = useState(false);
  console.log("The User Item => ", idUser);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    // setFile(selectedFile);
    if (selectedFile) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        // setError('file', { type: 'manual', message: '' }); // Clear any previous error message
    }
};
const userStaff = sessionStorage.getItem('dataStaff')

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true)
      try{

        let userParss = JSON.parse(userStaff)

        const userItem = role == "user" ?  await getUserById(idUser) :  await getStaffById(userParss.id);

  
        if(userItem && role == "user")
         {
           console.log("The User Item => ", userItem.users);
          // if(userItem)
          // {
            userItem.map(obj =>  {
              let roleData = JSON.stringify(obj.role)
              setRoleName(JSON.parse(roleData))
              setUserDat(obj)
              setName(obj.first_name)
              setLastName(obj.last_name)
              setEmail(obj.email)
              setPhone(obj.phone)
            })
          setLoading(false)
         }
         else{
          let roleData = JSON.stringify(userItem.role)
          setRoleName(JSON.parse(roleData))
          setUserDat(userItem)
          setName(userItem.first_name)
          setLastName(userItem.last_name)
          setEmail(userItem.email)
          setPhone(userItem.phone)
          setLoading(false)

         }
      }
      catch(err)
      {
        console.log("The error => ", err);
      }
      // }
    };

    
    // setName(userDat.first_name)
    getUserData();
  }, []);
  
  async function handleUpdate () {
      try{
      
        const formData = new FormData()         
        formData.append('first_name', name)
        formData.append('last_name', lastName)
        formData.append('phone', phone)
        formData.append('email', email)
        const respone = await axiosInstance.put('/api/auth/edit/' + userDat.id, {
          first_name: name,
          last_name: lastName,
          phone: phone,
          email: email
        });
         if(respone)
         {
           console.log("The Response  => ", respone.data);
           toast.success("User Updated")
         }
      }
      catch(error){
        console.log("The Error => ", error);
      }
  }
  async function handleUpdateStaff () {
      try{
      

        const respone = await axiosInstance.put('/api/staffs/' + userDat.id, {
          first_name: name,
          last_name: lastName,
          phone: phone,
          email: email
        });
         if(respone)
         {
           console.log("The Response  => ", respone.data);
           toast.success("User Updated")
         }
      }
      catch(error){
        console.log("The Error => ", error);
      }
  }

  const handleImageUpdate = async (newImage) => {
    try {
      setFile(newImage)
        const formData = new FormData();
        formData.append('image', newImage);

        const response = await axiosInstance.post(`/api/users/${userDat.id}/update-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(response)
        {
          console.log("The Response Data => ",response.data);
          
        }
    } catch (error) {
        console.error('Error updating image:', error);
    }
};

  async function ChangePassw() {
    try{
      const token = sessionStorage.getItem('tokenData');

      let tok = JSON.parse(token)
      // Construct the URL with parameters
      const url = `/api/auth/changepassword?current_password=${encodeURIComponent(currentPassword)}&new_password=${encodeURIComponent(newPassword)}&confirm_password=${encodeURIComponent(confirmPassword)}`;

      // Make the GET or POST request, here using POST for example
      const res = await axiosInstance.post(url, {}, {
          headers: {
              Authorization: `Bearer ${tok.token}` // Assuming the token is stored like this
          }
      });

      if(res)
      {
        console.log('Password changed successfully', res.data);
        toast.success("Password changed successfully")

      }


    }
    catch(err)
    {
      console.log("The Error => ",err);
    }
  }

  console.log("The Items of Product => ", file , " " , fileName);


  // if(!userDat?.id){
  //   return(
  //     <div>
  //       <h1>Hello</h1>
  //     </div>
  //   )
  // }

  const handleToggle = () => {
    if(role == 'user')
    {
      handleUpdate()
    }  
    else{
      handleUpdateStaff()
    }
  }
  const Image = file == null ? `${APIURL}/storage/${userDat.image}` : URL.createObjectURL(file)
  return (

    <TooltipProvider>
        <div className="flex items-center justify-between space-y-2 p-4 pt-20 bg-muted/40">
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <div
              className="flex items-center space-x-2 "
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: ".5rem",
              }}
            >
              <Button onClick={handleToggle}>Save</Button>
            </div>
        </div>

    <div className="flex gap-4 min-h-screen w-full flex-col bg-muted/40">

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      {
        Loading && idUser 
        ?
        <div className='justify-center items-center flex  h-[50vh]'>
        <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
      </div>
        :

        <main className="grid flex-1 items-start gap-10 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[140rem] flex-1 auto-rows-max gap-4">

            <div className="grid gap-10 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-9">

              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            
                <Card className="overflow-hidden sticky">
                  <CardHeader>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center">
                      <div className="card p-4">
                          <div className="image flex flex-col justify-center items-center">
                              <button className="btn btn-secondary overflow-hidden bg-neutral-300 flex justify-center items-center">
                                {
                                  userDat.image == null
                                  ?
                                  <img src="/public/avatar.png" height="100" width="150" alt="Profile" className='object-cover h-full'/>
                                  :
                                  <img src={Image} height="100" width="150" alt="Profile" className='object-cover h-full' />
                                }
                              </button>
                              <span className="name mt-3">{name + ' ' + lastName}</span>
                              <span className="idd">{roleName.name}</span>

                              <div className="flex flex-row mt-3">
                                  <span className="number">Email <span className="follow">{email}</span></span>
                              </div>
                              <div className="flex flex-row mt-3">
                                  <span className="number">Tele <span className="follow">{phone}</span></span>
                              </div>

                              {/* <div className="text mt-3">
                                  <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.Artist/ Creative Director by Day #NFT minting@ with FND night.Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.</span>
                              </div> */}
                              <div className="gap-3 mt-3 icons flex justify-center items-center">
                                  <FaTiktok size={18} />
                                  <FaFacebook />
                                  <RiInstagramFill />
                              </div>


                          </div>
                      </div>
                  </CardContent>
                </Card>

              </div>
              <div className="grid auto-rows-max items-start gap-10 lg:col-span-2 lg:gap-8">
                <Card >
                  <CardHeader>
                    <CardTitle className="border-b-2 pb-2">Profile</CardTitle>

                  </CardHeader>
                  <CardContent>

                  <div className='w-full'>
                    <label >User name:</label>
                    <Input value={userDat.username} className='my-3' placeholder='username' disabled/>
                </div>
            <div className='w-full flex items-center gap-5 pt-4'>

                <div className='w-full'>
                    <label >First name:</label>
                    <Input value={name}  onChange={(e) => setName(e.target.value)} className='my-3' placeholder='first name...'/>
                </div>
                <div className='w-full'>
                    <label>Last name :</label>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className='my-3' placeholder="last name..."/>
                </div>


            </div>
            <div className='w-full flex items-center gap-5 '>
                <div className='w-full'>
                    <label >Email:</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}  className='my-3' placeholder='example@gmail.com'/>
                </div>
                <div className='w-full'>
                    <label>Mobile:</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className='my-3' placeholder="0675162919"/>
                </div>
            </div>
            <div className='w-full flex items-center gap-5 '>
            <div className='w-full'>
                    <label >Role:</label>
                    <Input value={roleName.name} className='my-3' placeholder='test' disabled/>
                </div>
                {
                  role == 'user' &&
                  <div className='w-full md:w-full'>
              <label className='block mb-3'>Photo :</label>
              <Input id="example1" onChange={(e) => handleImageUpdate(e.target.files[0])} type="file" class="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-neutral-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />

            </div>
                }
            </div>





                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className='border-b-2 pb-2'>Change password</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className=" mt-4 mb-4 flex justify-center bg-white">
            {/* <div className=" p-4"> */}

                      <div className='w-full  '>
                          <label >Current Password:</label>
                          <Input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className='my-3' placeholder='write password' />
                          <label >New Password:</label>
                          <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  className='my-3' placeholder='write password' />
                          <label >Re-type New Password:</label>
                          <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='my-3' placeholder='write password' />
                          <div className='flex justify-end'>
                              <Button onClick={ChangePassw}>Change password</Button>
                          </div>

                      </div>
                  </div>
                  </CardContent>

                </Card>

              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>

          </div>

        </main>
        }
      </div>

    </div>

    </TooltipProvider>
  )
}
