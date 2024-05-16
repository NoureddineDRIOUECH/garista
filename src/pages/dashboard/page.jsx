import React, { useContext, useState } from "react";

import { Button } from "../../components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { MdRestaurantMenu } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FaLink } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Overview from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import {RecentSalesOrders} from "./components/recent-sales-orders"
import TeamSwitcher from "./components/team-switcher";
import { RiListUnordered } from "react-icons/ri";
import UserNav from "./components/user-nav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import LineChartpage from "./components/lineChart";
import { useEffect } from "react";
import { getRoles } from "../../../actions/Role/getRoles";
import { axiosInstance } from "../../../axiosInstance";
import {  useNavigate } from "react-router-dom";
import { useLogin } from "../../../actions/Authentification/LoginProvider";
import Spinner from "react-spinner-material";
function DashboardPage() {
  const [qrValue, setQrValue] = useState();
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [qrcodeLength, setQrcodeLength] = useState(0);
  const [userDat, setUserDat] = useState([])
  const idUser = sessionStorage.getItem('dataItem');
  const [isLoggedIn, setIsLoggedIn] = useState("not login");
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([]); // State to hold orders data

  // Check if user is logged in by verifying session storage
  // You may customize this based on how you handle authentication
  const checkLoginStatus = () => {
    const userLoggedIn = sessionStorage.getItem('isLoggedIn');
    setIsLoggedIn(userLoggedIn);
  };
  const [restos, setRestos] = useState([])

  const getOrders = async (id) => {
    setLoading(true)
    try{
       const res = await axiosInstance.get('/api/order_resto/' + id)
       if(res)
       {
        console.log('The Response of Order Resto => ', res.data);
        setOrders(res.data);

       }

    } 
    catch(err)
    {
      console.log('the Error => ', err.message);
    }
    finally{
      setLoading(false)
    }
  }

  const fetchData = async (id) => {
    setLoading(true);
    try {

      const dishesResponse = await axiosInstance.get('/api/dishes/'+id);
      const drinksResponse = await axiosInstance.get('/api/drinks/'+id);
      const qrCodeResponse = await axiosInstance.get('/api/qrcodes/'+id);
      console.log("The Response Dishes => ", dishesResponse.data.length );
      
      // const [dishesData, drinksData] = await Promise.all([dishesResponse, drinksResponse, qrCodeResponse]);
      
      // setDishes(dishesData.data);
      // setDrinks(drinksData.data);
      if(dishesResponse)
      {
        let Dataes = dishesResponse.data;
        let DateDrink = drinksResponse.data
        setTotalItems(Dataes.length + DateDrink.length);
        setQrcodeLength(qrCodeResponse.data.length)
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try{
                
        const restoInfoses = sessionStorage.getItem('RestoInfo');
        let Data = [];
        Data = JSON.parse(restoInfoses)
        let id;
        Data.map(item => {
            // setRestoInfo(item)
            setRestos(item)
            id = item.id
          })
          getOrders(id)
          fetchData(id)
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

  // Call checkLoginStatus on initial render
  useEffect(() => {
    checkLoginStatus();

  }, []);

  const orderCount = orders.length > 0 ? orders.length : 0;

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
      <div className="md:hidden">
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
      </div>

      <div className="hidden flex-col md:flex">

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
          <p className="pl-2 text-lg text-muted-foreground">
                    Overview 30 days
                    </p>
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
                      Visitors Number
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45231</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Orders</CardTitle>
                    <RiListUnordered className="h-4 w-4 text-muted-foreground"/>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orderCount}</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Items
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
                    <div className="text-2xl font-bold">{totalItems}</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      QR Codes
                    </CardTitle>
                    <IoQrCodeOutline className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{qrcodeLength}</div>
                    {/* <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p> */}
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Last 30 days Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview orders={orders.slice(-30)} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Best seller items</CardTitle>
                    {/* <CardDescription>
                      You made 265 sales this month.
                    </CardDescription> */}
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

                  </CardHeader>
                  <CardContent>

                    <RecentSalesOrders orders={orders} />


                  </CardContent>
                </Card>
                <LineChartpage />
            </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
