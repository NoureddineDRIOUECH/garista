import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import { IoMdCopy } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { MdRestaurantMenu } from "react-icons/md";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import TeamSwitcher from "../../pages/dashboard/components/team-switcher";
import UserNav from "../../pages/dashboard/components/user-nav";
import { QRCode } from "react-qrcode-logo";
import { useState } from "react";
import Spinner from "react-spinner-material";
import { getRestaurant } from "../../../actions/Restaurant/Restaurant";
import { useEffect } from "react";
import { getUserById } from "../../../actions/User/CreateUser";
import { axiosInstance } from "../../../axiosInstance";

export default function NavBar({ }) {
  const defaultPageURL = "https://votre-domaine.com/page";
  const [showQRCode, setShowQRCode] = useState(false); // State to control QR code display
  const [qrCodeURL, setQRCodeURL] = useState(''); 
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false);
  const [userDat, setUserDat] = useState([])
  const idUser = sessionStorage.getItem('dataItem');
  const [restoInfo, setRestoInfo] = useState([]);

  console.log('The User Resto => ',idUser);
  useEffect(() => {
    const getUserData = async () => {
      try{
        const res = await axiosInstance.get('/api/getResto/'+idUser);
        if(res)
        {
          setRestoInfo(res)
          let Data = res.data;
          let Slug = "";
          Data.map((item) => {
            console.log("tje item => " , item);
            Slug = item.slug
            setRestoInfo(item)
          })
          setQRCodeURL(`https://admin.garista.com/theme/${Slug}`)
        }
      }
      catch(err)
      {
        console.log("The Error => ", err);
      }
      // if(userItem)
      // {
        // userItem.map(obj =>  {
        //   console.log("The Items => ", obj);
        //   setUserDat(obj)
        // })
    };
  
    getUserData();
  }, []);

  // useEffect(() => {
  //   const fetchValue = async () => {
  //     let Data = JSON.parse(usersData);
  //     let Slug = "";
  //     Data.map((item) => {
  //       Slug = item.slug
  //     })
  //     setQRCodeURL(`http://192.168.11.115:3000/theme/${Slug}`)
  //   }

  //   fetchValue();
  // }, [])
  const baseUrl = `https://admin.garista.com/theme/${restoInfo.slug}?table_id=2`;
  // Data you want to send, e.g., an ID, other parameters
  const qrData = {
      id: 123,
      extraInfo: "MoreData"
  };
  const urlWithParams = `${baseUrl}`;

    console.log("The User Data => ", qrCodeURL);
  if(loading)
  {
      return(
      <div className='justify-center items-center flex  h-screen'>
          <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
        </div>
      )
  }

    // Function to copy QR code URL to clipboard
    const copyToClipboard = () => {
      navigator.clipboard.writeText(qrCodeURL);
      setCopied(true); // Set copied state to true
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-8" dir="rtl">
          <UserNav />
          <div className="w-1"></div>
          <Dialog>
            <DialogTrigger className="flex justify-center">
              <FaLink size={25} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ display: "flex", alignItems: "center" ,justifyContent:"center"}}>
                  <span style={{ marginRight: "0.5rem" }}>Your Menu</span>{" "}
                  <MdRestaurantMenu size={20} />
                </DialogTitle>
                <DialogDescription>
                  <div className="m-5 ml-10 flex mt-10 gap-10 ">
                  <QRCode
                            id="qrcode-id-unique-nav"
                            value={urlWithParams}
                            logoImage="/Logos/qrcode-logo.png"
                            logoWidth={40}
                            />
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center items-center ">
                {/* Lien vers votre page par défaut avec le domaine personnalisé */}

                {/* <input type="url" id="example8" className="block w-full h-10 pl-2 rounded-r-none border-gray-600 shadow-sm focus:z-10 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-600" placeholder="example.com" value="https://sailboatui.com/" disabled/> */}
              <div className="relative z-0 flex">
                    <div className="flex items-center justify-center gap-2">
                      <div className="block w-full  pl-2 rounded-r-none border-gray-600 shadow-sm focus:z-10 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-600">
                         {baseUrl}
                      </div>
                    <div>
                      <button onClick={copyToClipboard} for="example8" className="flex items-center space-x-4 rounded-md rounded-l-none border  border-gray-300 px-2.5 text-gray-700 hover:bg-gray-100">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                        </svg> */}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                  </div>
              </div>

           </div>

                


              </div>
            </DialogContent>
          </Dialog>

          {/* <TeamSwitcher /> */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full "
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>
                    <FaLink size={25} />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 flex flex-col items-center"
              align="end"
              forceMount
            >
              <div className="flex items-center mt-5">
                <MdRestaurantMenu size={20} />
                <span style={{ marginLeft: "0.5rem" }}>Your Menu</span>
              </div>
              <div className="m-5 mt-10 flex gap-10">
                <img
                  className="w-19 h-19"
                  src="https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4="
                  alt=""
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </div>
  );
}
