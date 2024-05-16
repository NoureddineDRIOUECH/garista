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
            <div className='grid grid-cols-6 gap-2'>
                                <Card className="w-[250px] h-[250px]">
                <CardHeader  className="text-center">
                <CardTitle>Menu</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="m-5 ml-10 flex mt-0 gap-10 ">
                <QRCode
                    id="qrcode-id-unique"
                    value={`https://admin.garista.com/theme/${restoInfo.slug}?table_id=2`}
                    logoImage="/Logos/qrcode-logo.png"
                    logoWidth={40}
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
                            <Dialog >
                            <DialogTrigger asChild>
                                <button>
                            <Card className="w-[250px] h-[250px]">
                        <CardHeader  className="text-center">
                        <CardTitle>{item.table.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="m-5 ml-10 flex mt-0 gap-10 ">
                        <QRCode
                            id="qrcode-id-unique"
                            value={urlWithParams}
                            logoImage="/Logos/qrcode-logo.png"
                            logoWidth={40}
                            className="w-64 h-64"
                        />
                        </div>
                        </CardContent>
                    </Card>
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
                           </Dialog>
                        </div>
                      )

                })}
                <Link to="/QrCode/AddQrCode">
                    <div className='flex gap-4'>

                    <Card className="w-[250px] h-[250px] border-dashed grid place-content-center">
                        <CardHeader className="text-center">
                        <CardTitle>Add a QrCode</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
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

export default AddQrCode;
