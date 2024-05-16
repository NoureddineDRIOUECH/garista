import React, { useState } from 'react';
import TabsDemo from '../../components/custom/tabs';
import { HiOutlineArrowDownOnSquare } from 'react-icons/hi2';
import Header from '../../pages/header';

const QrCodeform = () => {
    const [qrValue, setQrValue] = useState(undefined);
    const [tableNames, setTableNames] = useState([{ nom: "53" }]);

    // Fonction pour mettre à jour tableNames
    const updateTableNames = (newTableNames) => {
        setTableNames(newTableNames);
    };

    return (
        <React.Fragment>
            
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className='text-center p-3'>Download or print the QR code that your customers can scan to consult your menu. More on our Help page.</h1>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <div>
                        <TabsDemo tableNames={tableNames} updateTableNames={updateTableNames} />
                        <div className='mt-20'>
                            {/* <button className='px-5 py-2 bg-white text-blue-600 border-2 border-blue-500 flex gap-3 items-center font-normal rounded-md'>
                                <span>Download</span>
                            </button> */}
                             {/* <HiOutlineArrowDownOnSquare className='h-6 w-6 ml-3' /> */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QrCodeform;
