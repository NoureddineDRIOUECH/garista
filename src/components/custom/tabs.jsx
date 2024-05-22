import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { UserContext } from '../../QrCode/components/AddQrCode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { axiosInstance } from '../../../axiosInstance';

function TabsDemo({ qrValue, setQrValue }) {
    const defaultPageURL = "https://votre-domaine.com/page-par-defaut";
    const [names, setNames] = useState("");
    const user = useContext(UserContext);
    const [tableNames, setTableNames] = useState([]);
    console.log("User", tableNames);
    const updateTableNames = (newTableNames) => {
        setTableNames(newTableNames);
    };
    const navigate = useNavigate();

    const addToTableNames = async () => {
        try {
            const restoInfo = sessionStorage.getItem('RestoInfo');
            let Data = [];
            Data = JSON.parse(restoInfo)
            let id;
            Data.map(item => {
                id = item.id
            })
            // API call to create a new table
            const tableResponse = await axiosInstance.post(`/api/tables`, {
                name: names,
                resto_id: id
                // Add other necessary fields for table creation
            });
    
            if (tableResponse) {
                const table = tableResponse.data.Table;
                console.log("The Table ID => ", table);
                console.log("The Table ID => ", table.id);
                // Assuming the table ID is needed to create the QR code
                const qrCodeResponse = await axiosInstance.post(`/api/qrcodes`, {
                    table_id: table.id,
                    resto_id: id
                });
    
                if (qrCodeResponse) {
                    console.log("QR Code Created Successfully");
                    navigate("/QrCode");
                } else {
                    console.error("Failed to create QR Code");
                }
            }
            // setNames("");
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
       <>
                    <br/>
                    <Tabs defaultValue="password" className="w-[25rem] mx-auto">
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Table specific</CardTitle>
                                    <CardDescription>Create a QR code for a specific table</CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center  h-full">
                                    <div className="grid w-full max-w-sm items-center gap-2 pt-5 ">
                                        <Input
                                            type="text"
                                            placeholder="Table name"
                                            maxLength={6}
                                            minLength={2}
                                            value={names}
                                            onChange={(e) => setNames(e.target.value)}
                                        />
                                        <div>
                                           <button onClick={addToTableNames} className="bg-black text-white py-2 px-4 text-right rounded-[.7rem] text-md">Save</button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                 {/* </div>
        </div>
         </div> */}
        </>
    );
}

export default TabsDemo;
