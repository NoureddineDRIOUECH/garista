import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/dashboard/page";
import Login from "../authentification/page";
import Categories from "../Categories/page"
import Report from "../Report/page"
import Company from "../Company/page"
import Profile from "../Profile/page"
import QrCode from "../QrCode/page"
import Dishes from "../Dishes/page"
import Drinks from "../Drinks/page"
import AddQrCode from "../QrCode/components/AddQrCode";
import QrCodeform from "../QrCode/components/QrCodeform";
import DemoPage from "../Dishes/page";
import DemoPageDrink from "../Drinkss/page";
import DemoPagePromotion from "../Promootions/page";
import DemoPageOrders from "../Orders/page";
import { Tabs } from "../components/ui/tabs";
import TabsDemo from "../components/custom/tabs";
import Menu from '../Menu/page'
import Users from "../Users/page";
import Userform from "../Users/components/QrCodeform";
import Catform from "../Categories/components/QrCodeform";
import Reclamations from "../Reclamations/page";
import Arrangement from "../Arrangement/page"
import ArrangementChild from "../Arrangement/arrangementChild/page"
import DashboardCompany from "../Coompany/page";
import DashboardProfile from "../Proofile/page";
import Theme from "../Theme/App"

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
        {
          path: "/Login",
          element: <Login />,
          // children: [{ index: true, element: <Dashboard /> }],
        },
      {
        path: "/",
        element: <Layout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
      {
        path: "/Report",
        element: <Layout />,
        children: [{ index: true, element: <Report /> }],
      },
      {
        path: "/Orders",
        element: <Layout />,
        children: [{ index: true, element: < DemoPageOrders/> }],
      },
      {
        path: "/Arrangement",
        element: <Layout />,
        children: [
          { index: true, element: <Arrangement /> },
          { path: "/Arrangement/:id", element: <ArrangementChild /> },
        ],
      },
      {
        path: "/Menu",
        element: <Layout />,
        children: [{ index: true, element: < Menu/> }],
      },
      {
        path: "/QrCode",
        element: <Layout />,
        children: [{ index: true, element: <QrCode /> }],
      },
      {
        path: "/QrCode/AddQrCode",
        element: <Layout />,
        children: [{ index: true, element: <QrCodeform /> }],
      },
      {
        path: "/Users",
        element: <Layout />,
        children: [{ index: true, element: <Users /> }],
      },
      {
        path: "/Users/AddUser",
        element: <Layout />,
        children: [{ index: true, element: <Userform /> }],
      },
      {
        path: "/Categories",
        element: <Layout />,
        children: [{ index: true, element: <Categories /> }],
      },
      {
        path: "/Categories/AddCategories",
        element: <Layout />,
        children: [{ index: true, element: <Catform /> }],
      },
      {
        path: "/Dishes",
        element: <Layout />,
        children: [{ index: true, element: <DemoPage /> }],
      },
      {
        path: "/Drinks",
        element: <Layout />,
        children: [{ index: true, element: <DemoPageDrink /> }],
      },
      {
        path: "/Promotions",
        element: <Layout />,
        children: [{ index: true, element: <DemoPagePromotion /> }],
      },
      {
        path: "/Reclamations",
        element: <Layout />,
        children: [{ index: true, element: <Reclamations /> }],
      },
      {
        path: "/Company",
        element: <Layout />,
        children: [{ index: true, element: <DashboardCompany/> }],
      },
      {
        path: "/Theme/:slug",
        children: [{ index: true, element: <Theme /> }],
      },
    //   {
    //     path: "/Profile",
    //     element: <Layout />,
    //     children: [{ index: true, element: <Profile /> }],
    //   },
      {
        path: "/Profile",
        element: <Layout />,
        children: [{ index: true, element: <DashboardProfile /> }],
      },
      {
        path: "*",
        element: <Theme />
      }
    ],
  },
]);
