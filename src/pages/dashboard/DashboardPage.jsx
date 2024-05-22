import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
    Avatar,
    AvatarFallback
} from "../../components/ui/avatar";
import { MdRestaurantMenu } from "react-icons/md";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "../../components/ui/card";
import { FaLink } from "react-icons/fa6";
import {
    Tabs,
    TabsContent
} from "../../components/ui/tabs";
import Overview from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import TeamSwitcher from "./components/team-switcher";
import UserNav from "./components/user-nav";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "../../components/ui/dialog";
import LineChartpage from "./components/lineChart";
import { useEffect } from "react";
import QRCode from 'react-qrcode-logo';
import Spinner from "react-spinner-material";

export function DashboardPage() {
    const [restoInfo, setRestoInfo] = useState([]);
    const [usersData, setUsersData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getUserData = () => {
          const userData = localStorage.getItem('userGarista');
          if (userData) {
            // User data found, do something with it
            console.log('User data:', JSON.parse(userData));
            setUsersData(userData)
          } else {
            // No user data found
            console.log('No user data found');
          }
        };

        const getRestaurantByUser = async ()  => {
            setLoading(true)
            try{
              const res = await getRestaurant(usersData.id);
              if(res)
              {
                setRestoInfo(res.data);
                setLoading(false)
              }
            }
            catch(err)
            {
                console.log("The Error", err);
            }
        }
        getRestaurantByUser();
        getUserData();
      }, []);

    const defaultPageURL = "https://votre-domaine.com/page-par-defaut";
    const [showQRCode, setShowQRCode] = useState(false); // State to control QR code display
    const [qrCodeURL, setQRCodeURL] = useState(''); 
    const toggleQRCode = () => {
      setShowQRCode(!showQRCode);
      if (!showQRCode) {
        // Generate the QR code URL when showing the QR code
        // Replace 'YOUR_SLUG' with the actual slug from your API
        const slug = 'YOUR_SLUG'; // Get the slug from your API
        const qrCodeLink = `http://localhost:3000/theme/${slug}`;
        setQRCodeURL(qrCodeLink);
      }
    };

    console.log('The UserRestaurant => ', restoInfo);

    if(loading)
    {
        return(
        <div className='justify-center items-center flex  h-[50vh]'>
            <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
          </div>
        )
    }
    return (
        <div className="">
            {/* <div className="md:hidden">
              <img
                src="/examples/dashboard-light.png"
                alt="Dashboard"
                className="block dark:hidden"
              />
              <img
                src="/examples/dashboard-dark.png"
                alt="Dashboard"
                className="hidden dark:block"
              />
            </div> */}

            <div className=" flex-col flex">
                <div className="border-b ">
                    <div className="flex h-16 items-center px-4">
                        <div className="ml-auto flex items-center space-x-8" dir="rtl">
                            <UserNav data={usersData}/>
                            <div className="w-1"></div>
                            <Dialog>
                                <DialogTrigger className="flex justify-center">
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><FaLink size={22} /></AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <span style={{ marginRight: "0.5rem" }}>Your Menus</span>{" "}
                                            <MdRestaurantMenu size={20} />
                                        </DialogTitle>
                                        <DialogDescription>
                                            <div className="m-5 ml-10 flex mt-10 gap-10 ">
                                                {showQRCode && <QRCode value={qrCodeURL} logoImage="path_to_your_logo_image" />}

                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="flex justify-center items-center">
                                        {/* Lien vers votre page par défaut avec le domaine personnalisé */}
                                        <a
                                            href={defaultPageURL}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {defaultPageURL}
                                        </a>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <TeamSwitcher />
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
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <div
                            className="flex items-center space-x-2 "
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: ".5rem",
                            }}
                        >
                            {/* <Button>Download</Button> */}
                        </div>
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        {/* <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList> */}
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            visitors number
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">45231</div>
                                        <p className="text-xs text-muted-foreground">
                                            +20.1% from last month
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">2350</div>
                                        <p className="text-xs text-muted-foreground">
                                            +180.1% from last month
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total items
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <rect width="20" height="14" x="2" y="5" rx="2" />
                                            <path d="M2 10h20" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">12,234</div>
                                        <p className="text-xs text-muted-foreground">
                                            +19% from last month
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total QR Codes
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">573</div>
                                        <p className="text-xs text-muted-foreground">
                                            +201 since last hour
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Overview 30d Orders</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Overview />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Best Orders</CardTitle>
                                        <CardDescription>
                                            You made 265 sales this month.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentSales />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Last 10 Orders</CardTitle>
                                <CardDescription>
                                    You made 265 sales this month.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentSales />
                            </CardContent>
                        </Card>
                        <LineChartpage />
                    </div>
                </div>
            </div>
        </div>
    );
}
