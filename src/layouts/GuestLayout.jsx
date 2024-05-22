import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LayoutDashboard, Home, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../pages/SideBar.jsx";


function Layout() {

  return (
    <>
    <header>
    <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" alert />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<StickyNote size={20} />} text="Projects" alert />
          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
          <SidebarItem icon={<Layers size={20} />} text="Tasks" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>
      </div>


    </header>
    <main>
        <Outlet/>
    </main>
    </>

  )
}

export default Layout
