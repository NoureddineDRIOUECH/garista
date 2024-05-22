import React from 'react'

const data = [
    {
        id: 1,
        head: "table",
        img: "https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=",
        footer: "screen here",
        style1: "w-full bg-white h-14 ",
        style2: "w-full bg-blue-500 h-14 rounded-b-lg"
    },
    {
        id: 2, 
        head: "table",
        img: "https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=",
        footer: "screen here",
        style1: "w-full bg-blue-500 h-14 rounded-t-lg ",
        style2: "w-full bg-white h-14 "
    },
    {
        id: 3,
        head: "table",
        img: "https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=",
        footer: "screen here",
        style1: "w-full bg-blue-500 h-14 rounded-t-lg ",
        style2: "w-full bg-blue-500 h-14 rounded-b-lg"
    },
    {
        id: 4,
        head: "table",
        img: "https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=",
        footer: "screen here",
        style1: "w-full bg-white h-14 border-2 rounded-t-lg border-b-0 border-blue-500 ",
        style2: "w-full bg-white h-14 rounded-b-lg border-2 border-t-0 border-blue-500"
    },
    {
        id: 5,
        head: "table",
        img: "https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=",
        footer: "screen here",
        style1: "w-full bg-white h-14  ",
        style2: "w-full bg-blue-500 h-14 rounded-b-lg"
    }

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
const QrCodeTemplate = ({ setQrValue }) => {
    return (
        <div className='border w-[50rem] h-[40rem] rounded-md'>
            <h1 className='p-4 text-2xl '>QR code template</h1>
            <div className='m-5 border-b-2 pb-6'>
                <div className='grid grid-cols-3 gap-4  '>
                    <div className="w-full bg-white h-32 border rounded-md  cursor-pointer shadow-xl p-5 py-2  ">
                        <h1 className='text-center text-sm'>table</h1>
                        <img className="w-16 h-16 m-auto" src="https://media.istockphoto.com/id/828088276/fr/vectoriel/code-qr-illustration.jpg?s=612x612&w=0&k=20&c=3HruJu6JLgPsHstpZ5p43XkqqvP5c7AzJ7qwZ8KGgG4=" alt="" />
                        <h1 className='text-center text-sm'>screen here</h1>
                    </div>
                    {
                        data.map((item) => {
                            return (
                                <div key={item.id} onClick={() => setQrValue(item)} className="w-full bg-white h-32 border rounded-md  cursor-pointer shadow-xl p-5 py-2 ">
                                    <div className={item.style1}>
                                        <h1 className='text-center text-sm'>{item.head}</h1>
                                        <img className="w-16 h-16 m-auto" src={item.img} alt="" />
                                        <h1 className={`text-center text-sm ${item.id === 4 ? "text-black" : "text-white"}`}>{item.footer}</h1>
                                    </div>
                                    <div className={item.style2}></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div>
                <h1 className='text-lg mx-5 p-4'>Background color</h1>
                <div className='flex gap-3 items-center mx-10'>
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
                <h1 className='text-lg mx-5 p-4'>Text color</h1>
                <div className='flex gap-3 items-center mx-10'>
                    <div className='h-5 w-5 bg-black  cursor-pointer rounded-md'></div>
                    <div className='h-5 w-5 bg-gray-600  cursor-pointer rounded-md'></div>
                </div>
            </div>
        </div>
    )
}
export default QrCodeTemplate
