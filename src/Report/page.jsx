import React, { useContext, useState } from "react";

import { Button } from "./../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./../components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./../components/ui/avatar";
import { MdRestaurantMenu } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import CardsStats from "./components/LineChart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./../components/ui/card";
import { FaLink } from "react-icons/fa6";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../components/ui/tabs";
import Overview from "../pages/dashboard/components/overview";
import { RecentSales } from "../pages/dashboard/components/recent-sales";
import TeamSwitcher from "../pages/dashboard/components/team-switcher";
import UserNav from "../pages/dashboard/components/user-nav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./../components/ui/dialog";
import LineChartpage from "../pages/dashboard/components/lineChart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import SelectDate from "./components/SelectDate";
import DonutChartHero from "./components/CircleChart"
function Report() {
  const [qrValue, setQrValue] = useState();

  const defaultPageURL = "https://votre-domaine.com/page-par-defaut";
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
            <h2 className="text-3xl font-bold tracking-tight">Report</h2>
            <div
              className="flex items-center space-x-2 "
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: ".5rem",
              }}
            >
              {/* <Button>Download</Button> */}
              <SelectDate/>
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
                <Card >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="size-11 text-black"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>

                    <div className="grid">
                       <CardTitle className="text-2xl font-medium">Visitors Number</CardTitle>
                    <CardDescription className="text-black text-lg text-end">45231</CardDescription>
                    </div>


                  </CardHeader>

                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <AiOutlineUnorderedList  className="text-black size-11"/>
                  <div>
                     <CardTitle className="text-xl font-medium">Orders</CardTitle>
                    <CardDescription className="text-black text-lg text-end">2350</CardDescription>
                  </div>


                  </CardHeader>

                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-black size-11"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                    <div className="grid">
                      <CardTitle className="text-xl font-medium">Revnue</CardTitle>
                    <CardDescription className="text-black text-lg text-end">2350</CardDescription>

                    </div>

                  </CardHeader>
                  {/* <CardContent>
                    <div className="text-2xl font-bold">12,234</div>

                  </CardContent> */}
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-black size-11"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    <div className="grid">
                      <CardTitle className="text-xl font-medium">Visitors Performance</CardTitle>
                      <CardDescription className="text-black text-lg text-end">264578</CardDescription>
                    </div>


                  </CardHeader>

                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Last 30 days Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>

                  <CardsStats/>

              </div>
            </TabsContent>
          </Tabs>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

          {/* <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Last 10 Orders</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card> */}
                <DonutChartHero/>
                {/* <LineChart/> */}
                <LineChartpage />
            </div>
            <Card className="col-span-9">
                  <CardHeader>
                    <CardTitle>Top Performing Items</CardTitle>
                    {/* <CardDescription>
                      You made 265 sales this month.
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
        </div>
      </div>
    </div>
  );
}

export default Report;
