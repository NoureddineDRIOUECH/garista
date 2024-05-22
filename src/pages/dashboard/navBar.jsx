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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import TeamSwitcher from "../../pages/dashboard/components/team-switcher";
import UserNav from "../../pages/dashboard/components/user-nav";
import { QRCode } from "react-qrcode-logo";
import { useContext, useState } from "react";
import Spinner from "react-spinner-material";
import { getRestaurant } from "../../../actions/Restaurant/Restaurant";
import { useEffect } from "react";
import { getUserById } from "../../../actions/User/CreateUser";
import { axiosInstance } from "../../../axiosInstance";
import Pusher from 'pusher-js';
import { formatDistanceToNow } from 'date-fns';
// import { toast } from "react-hot-toast";
import { useToast } from "@/components/ui/use-toast"
import Logo from "../../../public/Logos/garista.svg"
import { SidebarContext } from "../../layouts/Layout";
import { FaBars } from "react-icons/fa";

export default function NavBar({ }) {
  const defaultPageURL = "https://votre-domaine.com/page";
  const [showQRCode, setShowQRCode] = useState(false); // State to control QR code display
  const [qrCodeURL, setQRCodeURL] = useState(''); 
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false);
  const [userDat, setUserDat] = useState([])
  const idUser = sessionStorage.getItem('dataItem');
  const [restoInfo, setRestoInfo] = useState([]);
 const [notifications, setNotifications] = useState([])
 
 const { toast } = useToast()

  console.log('The User Resto => ',idUser);
  // Initialize Pusher
  const fetchNotifications = async (id) => {
    try {
      // Make a GET request to your server's API endpoint to fetch notifications
      console.log('the resto info ',id);
      const response = await axiosInstance.get(`/api/getNotifications/${id}`);
      console.log("fetched data is ", response.data);
      // If successful, update the notifications state with the fetched data
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  const { expanded, setExpanded } = useContext(SidebarContext);

  useEffect(() => {
    const getUserData = async () => {
      try{
        // const res = await axiosInstance.get('/api/getResto/'+idUser);
        const restore = await sessionStorage.getItem('RestoInfo')
        if(restore)
        {
          let DataResto = JSON.parse(restore)
          // setRestoInfo(DataResto)
          console.log("the restau info ", DataResto, restore, restoInfo);
          // let Data = res.data;
          let Slug = "";
          DataResto.map((item) => {
            Slug = item.slug
            console.log("tje item => " , item, item.id);
            setRestoInfo(item)
            fetchNotifications(item.id)
            console.log();
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

  useEffect(() => {
  
    // Fetch notifications from the server upon component mount
    // const pusher = new Pusher('84cd32aea0c4b858f18e', {
    //   cluster: 'eu',
    //   encrypted: true,
    // });
    // // Subscribe to the channel
    // const channel = pusher.subscribe('my-channel');
    // channel.bind('form-submited', function(data) {
    //   // Update notifications state
    //   let Dates = [];
    //   // Dates = data
    //   // Dates.length > 0 && Dates.map(item => {
    //   // })
    //   console.log("The Item of The Data => ", Dates.post);
    //   if (data.post.resto_id === restoInfo.id) {
    //     // Update notifications state with the new notification
    //     setNotifications(prevNotifications => [data, ...prevNotifications]);
    //   }
    //   // setNotifications((prevNotifications) => [data, ...prevNotifications]);
    // });
    const pusher = new Pusher('84cd32aea0c4b858f18e', {
      cluster: 'eu',
      encrypted: true,
    });
  
    const channel = pusher.subscribe('my-channel');
  
    channel.bind('form-submited', function(data) {
      try {
        console.log("Data received from Pusher:", data);
  
        // Assuming data contains the notification directly
        const newNotification = data.post
        console.log('New notification', newNotification);
        console.log('the restau info', restoInfo.id)
         let resoIdNoti = newNotification.resto_id
        // Ensure notification is for the current restaurant
        if (parseInt(resoIdNoti) === restoInfo.id) {
          console.log("New notification for current restaurant:", newNotification);
          // toast.success(`New notification: ${newNotification.title}`);

            toast({
              title: newNotification.title,
              // description: "Friday, February 10, 2023 at 5:57 PM",
            })
          setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
        }
      } catch (error) {
        console.error('Error updating notifications:', error);
      }
    });
    // Cleanup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [restoInfo.id]);
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
      navigator.clipboard.writeText(baseUrl);
      setCopied(true); // Set copied state to true
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };
    console.log('All notfication', notifications);

    const toggleSidebar = () => {
      setExpanded(!expanded);
    };
  return (
    <div className="border-b fixed top-0 left-0 w-full z-20 bg-white">
      <div className="flex h-16 items-center">
        <button onClick={toggleSidebar} className="md:hidden p-2">
            <FaBars size={24} />
          </button>
        <div className="ml-auto flex items-center space-x-8 xl:pr-5 pr-2" dir="rtl">
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
                  <div className="m-5 flex mt-10 gap-10 ">
                 <QRCode
                        id="qrcode-id-unique-nav"
                        value={urlWithParams}
                        logoImage={Logo}
                        removeQrCodeBehindLogo={true}
                        logoPaddingStyle="circle"
                        qrStyle='squares'
                        logoWidth={40}
                        eyeRadius={5}
                        eyeColor="#28509E"
                        className="!w-[250px] !h-[2050px]"
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
                         {qrCodeURL}
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
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative" size="icon" variant="ghost">
              <BellIcon className="h-6 w-6" />
              {notifications.length != 0 &&
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
              }
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-4">
  <DropdownMenuLabel className="mb-2 text-lg font-medium">Notifications</DropdownMenuLabel>
  <div className="space-y-4">
    {notifications.length == 0 ? (
      <p className="ml-5 text-sm text-gray-500 dark:text-gray-400">No notifications</p>
    ) : (
      notifications
      // .reverse()
      .slice(0, 3)
      .map((notification, index) => {
        // console.log("The Notifications => ", notification.post);
        const { title, created_at } = notification;

        const timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });

        return (
          <div key={index} className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <CalendarCheck2Icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium">{title.length > 20 ? title.slice(0, 30) + '...' : title }</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
            </div>
          </div>
        );
      })
    )}
  </div>
</DropdownMenuContent>
        </DropdownMenu>
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
function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function CalendarCheck2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M3 10h18" />
      <path d="m16 20 2 2 4-4" />
    </svg>
  )
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}