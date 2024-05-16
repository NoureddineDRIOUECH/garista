import React, { useState } from 'react'
import { QRCode } from 'react-qrcode-logo'

const QrCodeTemplate = ({ setQrValue }) => {
    const backgroundStyle = {
        backgroundImage: 'linear-gradient(to bottom, #3b82f6 0%, #3b82f6 50%, #3b82f6 50%, #3b82f6 100%)',
      };
    // console.log("The Style => ",stylebg);
    const data = [
        {
            id: 1,
            head: "table",
            img: "https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=",
            footer: "scan here",
            idStyle: "CustomQR-2"
        },
        {
            id: 2,
            head: "table",
            img: "https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=",
            footer: "scan here",
            idStyle: "CustomQR-1"
        },
        {
            id: 3,
            head: "table",
            img: "https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=",
            footer: "scan here",
            idStyle: "CustomQR"
        },


    ]
    const colorData = [
        {
            id: 1,
            style: 'h-5 w-5 bg-red-600  cursor-pointer rounded-md'
        },
        {
            id: 2,
            style: 'h-5 w-5 bg-blue-600  cursor-pointer rounded-md'
        },
        {
            id: 3,
            style: 'h-5 w-5 bg-sky-400  cursor-pointer rounded-md'
        },
        {
            id: 4,
            style: 'h-5 w-5 bg-purple-600  cursor-pointer rounded-md'
        },
        {
            id: 5,
            style: 'h-5 w-5 bg-green-600  cursor-pointer rounded-md'
        }
    ]
    return (
        <div className='border w-[50rem] h-[40rem] rounded-md'>
            <h1 className='p-4 text-2xl '>QR code template</h1>
            <div className='m-5 border-b-2 pb-6'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="w-full  h-full border rounded-md  cursor-pointer  p-5 py-2  ">
                        <h1 className='text-center text-sm'>table</h1>
                        <QRCode
                            id="qrcode-id-unique"
                            value="https://fadadoussama.com/"
                            logoImage="/Logos/qrcode-logo.png"
                            logoWidth={40}
                            />
                        <h1 className='text-center text-sm'>scan here</h1>
                    </div>
                    {
                        data.map((item) => {
                            return (
                                <div key={item.id} onClick={() => setQrValue(item)} className="relative w-full  h-full border rounded-md  cursor-pointer  p-4">
                                    <div id={`${item.idStyle}`} className={`${item.idStyle}`} >
                                    <h1 className='text-center text-sm ' >{item.head}</h1>
                                        <QRCode
                                            id="qrcode-id-unique"
                                            value="https://fadadoussama.com/"
                                            logoImage="/Logos/qrcode-logo.png"
                                            logoWidth={4}
                                        />
                                        <h1 className={`text-center text-sm ${item.id === 4 ? "text-black" : "text-white"}`}>{item.footer}</h1>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex justify-between'>
            <div>
                <h1 className='text-lg mx-5 '>Background color</h1>
                <div className='flex gap-3 items-center mx-10 '>
                    {
                        colorData.map((item) => {
                            return (
                                <div key={item.id} className={item.style}></div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <h1 className='text-lg mx-5 '>Text color</h1>
                <div className='flex gap-3 items-center mx-10'>
                    <div className='h-5 w-5 bg-black  cursor-pointer rounded-md'></div>
                    <div className='h-5 w-5 bg-gray-600  cursor-pointer rounded-md'></div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default QrCodeTemplate
