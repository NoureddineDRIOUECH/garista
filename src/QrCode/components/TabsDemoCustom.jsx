import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { UserContext } from '../../QrCode/components/AddQrCode';
import { BsDownload } from "react-icons/bs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SlRefresh } from "react-icons/sl"
import { QRCode } from 'react-qrcode-logo';
function TabsDemoCustom({ qrValue, setQrValue }) {
    const defaultPageURL = "https://votre-domaine.com/page-par-defaut";
    const [names, setNames] = useState("");
    const user = useContext(UserContext);
    const [tableNames, setTableNames] = useState([]);
    console.log("User", tableNames);
    const updateTableNames = (newTableNames) => {
        setTableNames(newTableNames);
    };

    const addToTableNames = () => {
        updateTableNames([...tableNames, { nom: names }]);
        setNames("");
    };

    return (
       <>
         {/* <div className="flex flex-col items-center justify-center h-screen">
             <h1 className='text-center p-3'>Download or print the QR code that your customers can scan to consult your menu. More on our Help page.</h1>
             <div className='flex-1 space-y-4 p-8 pt-6'>

                 <div> */}
        {/* <Link to="/QrCode" className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4">Back to QrCode</Link> */}
                    <br/>
                    <Tabs defaultValue="menu" className="w-[25rem] mx-auto">


                            <h3 className='text-center text-lg font-semibold'>Custom QrCode</h3>


                        <TabsContent value="menu">
                            <Card>
                                <CardHeader>
                                <CardTitle className="flex justify-between items-center">Menu <SlRefresh onClick={() => setQrValue('')} className="w-6 h-6 text-blue-600 cursor-pointer" /></CardTitle>
                                    <CardDescription>Make generate to your code Qr here.</CardDescription>
                                </CardHeader>
                                {qrValue ? (
                                    <div className="h-64 p-10 py-5 px-0 pb-0">
                                        <div className={` ${qrValue.idStyle}  `}>
                                        <QRCode
                                            id="qrcode-id-unique"
                                            value="https://fadadoussama.com/"
                                            logoImage="/Logos/qrcode-logo.png"
                                            logoWidth={4}
                                        />
                                         <h1 className={`text-center text-sm ${qrValue?.id === 4 ? "text-black" : "text-white"}`}>{qrValue?.footer}</h1>
                                        </div>
                                        {/* <div className={`${qrValue?.style2.includes('bg-blue-500') ? 'w-full bg-blue-500 h-32 rounded-b-lg' : 'w-full bg-white h-32 rounded-b-lg border-2 border-t-0 border-blue-500'} `}></div> */}
                                    </div>
                                ) : (
                                    <CardContent className="space-y-2 p-10 py-5 px-0 pb-0">
                                         <div  id={` ${qrValue?.idStyle}  `} className={` ${qrValue?.idStyle}  `}>
                                    <h1 className='text-center text-sm ' >{qrValue?.head}</h1>
                                        <QRCode
                                            id="qrcode-id-unique"
                                            value="https://fadadoussama.com/"
                                            logoImage="/Logos/qrcode-logo.png"
                                            logoWidth={4}
                                        />
                                        <h1 className={`text-center text-sm ${qrValue?.id === 4 ? "text-black" : "text-white"}`}>{qrValue?.footer}</h1>
                                    </div>
                                    </CardContent>
                                )}
                            </Card>
                        </TabsContent>

                    </Tabs>
                    <div className='mt-20 flex justify-end'>
                            <button className='px-5 py-2 bg-white text-blue-600 border-2 border-blue-500 flex gap-3 items-center font-normal rounded-md'>
                                <span>Download</span>
                                 <BsDownload className='h-6 w-6 ml-3' />
                            </button>

                        </div>
                 {/* </div>
        </div>
         </div> */}
        </>
    );
}

export default TabsDemoCustom;
