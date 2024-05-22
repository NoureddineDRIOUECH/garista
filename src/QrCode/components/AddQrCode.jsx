import React, { createContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import TabsDemo from '../../components/custom/tabs';
import QrCodeTemplate from './QrCodeTemplate';
import TabsDemoCustom from './TabsDemoCustom';
import { QRCode } from 'react-qrcode-logo';
import { useEffect } from 'react';
import { axiosInstance } from '../../../axiosInstance';
import Spinner from 'react-spinner-material';
import Logo from "../../../public/Logos/garista.svg"
import { Button } from '../../components/ui/button';
import { toast } from "react-hot-toast";
import { DialogClose } from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { SidebarContext } from '../../layouts/Layout';

export const UserContext = createContext();

function AddQrCode({props}) {
    const { state } = useLocation();

    const { names } = state == null ? "tes" : state.value;


    console.log("qr",names)

  const [user, setUser] = useState([{ nom: 'toto' },{ nom: 'titi' }]);
  console.log(user);
  const [tableNames, setTableNames] = useState([]);
  const [QrCode, setQrCode] = useState([])
  const [loading, setLoading] = useState(false)
  const [restoInfo, setRestoInfo] = useState([])
  // Fonction pour mettre à jour tableNames
  const updateTableNames = (newTableNames) => {
      setTableNames(newTableNames);
  };
  const { expanded } = useContext(SidebarContext);

  useEffect(() => {
    async function fetchValues()
    {
        setLoading(true)
        const restoInfo = sessionStorage.getItem('RestoInfo');
        let Data = [];
        Data = JSON.parse(restoInfo)
        let id;
        Data.map(item => {
            id = item.id
            setRestoInfo(item)
        })
        try{
           const res = await axiosInstance.get('/api/qrcodes/'+id)
           
           // Data you want to send, e.g., an ID, other parameters
           const qrData = {
               id: 123,
               extraInfo: "MoreData"
            };
            if(res){
               console.log("The Response is => ", res.data);
               setQrCode(res.data)
           }
        }
        catch(err)
        {
            console.log("The Error => ", err);
        }
        finally{
            setLoading(false)
        }
    }

    fetchValues()
  }, [])

  const handleDelete = async (itemId,QrCode) => {
     try{
       const res = await axiosInstance.delete('/api/qrcodes/'+itemId)
       if(res)
       {
        toast.success("QrCode deleted");
        setQrCode(QrCode.filter(item => item.id !== itemId));  
       }
     }
     catch(err)
     {
        console.log("the Error => ",err);
     }
  }
  const [qrValue,setQrValue] =useState()


  return (
    <>
    {
            loading 
            ?
            <div className='justify-center items-center flex  h-[50vh]'>
             <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
            </div>
            :
            <div className={`grid sm:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6 ${expanded ?"md:grid-cols-1 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4" } gap-5`}>
               <Card className="w-full mx-auto md:mx-0 h-[250px]">
                        <CardHeader  className="text-center ">
                             <CardTitle>Menu</CardTitle>

                        </CardHeader>
                    <CardContent>
                    <div className="m-5 flex mt-0 gap-10 ">
                    <QRCode
                        id="qrcode-id-unique"
                        value={`https://admin.garista.com/theme/${restoInfo.slug}?table_id=2`}
                        logoImage={Logo}
                        removeQrCodeBehindLogo={true}
                        logoPaddingStyle="circle"
                        qrStyle='squares'
                        logoWidth={40}
                        eyeRadius={5}
                        eyeColor="#28509E"
                        className="w-64 h-64"
                    />
                    </div>
                    </CardContent>
            </Card>

                {QrCode.length > 0 && QrCode.map((item, index) => {
                      const baseUrl = `https://admin.garista.com/theme/${restoInfo.slug}`;

                      const urlWithParams = `${baseUrl}?table_id=${encodeURIComponent(item.table_id)}`;
                      return(
                        <div key={index}>
                            <Card className="w-full mx-auto md:mx-0  h-[250px]">
                        <CardHeader  className="text-center relative">
                           <CardTitle>{item.table.name}</CardTitle>
                           <div className='absolute top-2 right-5'>
                                <Dialog className="items-center justify-center">
                                    <DialogTrigger asChild>
                                       <Button size="icon" variant="outline">
                                        <TrashIcon className="w-4 h-4" />
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-[425px] items-center justify-center ">
                                        <DialogHeader className="items-center justify-center ">
                                            <DialogTitle className="flex items-center text-[1.7rem]"> Are you sure ?</DialogTitle>
                                        </DialogHeader>
                                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                            <DialogClose>
                                                <Button variant="outline">
                                                Cancel
                                                </Button>
                                            <Button className="bg-black text-white" variant="darkBlack" onClick={() => handleDelete(item.id, QrCode)}>Continue</Button>
                                            </DialogClose>
                                        </div>
                                    </DialogContent>


                                </Dialog>
                             </div>
                        </CardHeader>
                        <CardContent>
                        <div className="m-5  flex mt-0 gap-10 ">
                        <QRCode
                            id="qrcode-id-unique"
                            value={urlWithParams}
                            logoImage={Logo}
                            removeQrCodeBehindLogo={true}
                            logoPaddingStyle="circle"
                            qrStyle='squares'
                            logoWidth={40}
                            eyeRadius={5}
                            eyeColor="#28509E"
                            className="w-64 h-64"
                        />
                        </div>
                        </CardContent>
                    </Card>
                            {/* <Dialog >
                            <DialogTrigger asChild>
                                <button>
                    </button>
                    </DialogTrigger >
                    <DialogContent className="max-w-[85rem]">
                    <div className='m-5 ml-10 flex mt-10 gap-10 '>
                                <QrCodeTemplate setQrValue={setQrValue}/>
                                <div>
                                    <TabsDemoCustom qrValue={qrValue} setQrValue={setQrValue}/>

                                </div>
                            </div>
                    </DialogContent>
                           </Dialog> */}
                        </div>
                      )

                })}
                <Link to="/QrCode/AddQrCode">
                    <div className='flex gap-4'>

                    <Card className="w-full mx-auto md:mx-0  h-[250px] border-dashed grid place-content-center">
                        <CardHeader className="text-center">
                        <CardTitle>Add a QrCode</CardTitle>
                        <CardDescription>
                            Add a specific QrCode for you tables
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                        {/* Afficher le tableau de noms de tables */}
                        {tableNames.map((tableName, index) => (
                            <div key={index}>{tableName.nom}</div>
                        ))}
                        <UserContext.Provider value={user}>
                        {/* <TabsDemo tableNames={tableNames} updateTableNames={updateTableNames} /> */}

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
                                // Action à effectuer lors du clic sur l'icône
                                console.log('Icon clicked');
                                }}
                            >
                                <MdAddBox size={50} style={{ color: '#000' }} />
                            </button>
                            {/* </Link> */}
                        </UserContext.Provider>
                        </CardContent>
                    </Card>
                    </div>
                </Link>
            </div>
    }
    </>
  );
}


function TrashIcon(props) {
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
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    );
  }
export default AddQrCode;
