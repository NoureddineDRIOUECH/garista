import React, { useState } from 'react';
// import {
//   Credenza,
//   CredenzaBody,
//   CredenzaClose,
//   CredenzaContent,
//   CredenzaFooter,
//   CredenzaHeader,
//   CredenzaTitle,
//   CredenzaTrigger,
// } from "@/components/ui/credenza";
import "./Dettaille.css"
function Dettaille({ updateFormState, setUpdateFormState }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(!isModalOpen);
  };

  const Data = [
    {
      type: "burgers",
      colomns: [
        { id: 1, image: 'https://i.pinimg.com/564x/8e/d1/f7/8ed1f76dae0975459d1b660e34b1f20b.jpg', quant: '450g', type: 'Burger', title: 'Burger', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ', time: '20min', price: '80 dh' },
        { id: 2, image: 'https://i.pinimg.com/564x/8e/d1/f7/8ed1f76dae0975459d1b660e34b1f20b.jpg', quant: '500g', type: 'Burger', title: 'Normal Burger', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ', time: '25min', price: '75 dh' },
        { id: 3, image: 'https://i.pinimg.com/564x/8e/d1/f7/8ed1f76dae0975459d1b660e34b1f20b.jpg', quant: '370g', type: 'Burger', title: 'Burger extra cheddar', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ', time: '20min', price: '85 dh' },
        { id: 4, image: 'https://i.pinimg.com/564x/8e/d1/f7/8ed1f76dae0975459d1b660e34b1f20b.jpg', quant: '400g', type: 'Burger', title: 'Burger chicken', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ', time: '30min', price: '100 dh' },
      ],
    },
    {
      type: "Donuts",
      colomns: [
        { id: 1, image: 'https://i.pinimg.com/564x/7f/7e/9e/7f7e9e55e64b6a8a4e1ef7a185546d95.jpg', quant: '450g', type: 'Donuts', title: 'Donut Glacé', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ', time: '20min', price: '80 dh' },
        { id: 2, image: 'https://i.pinimg.com/564x/7f/7e/9e/7f7e9e55e64b6a8a4e1ef7a185546d95.jpg', quant: '500g', type: 'Donuts', title: 'Donut à la Confiture', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ', time: '25min', price: '75 dh' },
        { id: 3, image: 'https://i.pinimg.com/564x/7f/7e/9e/7f7e9e55e64b6a8a4e1ef7a185546d95.jpg', quant: '370g', type: 'Donuts', title: 'Donut à la Crème', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ', time: '20min', price: '85 dh' },
        { id: 4, image: 'https://i.pinimg.com/564x/7f/7e/9e/7f7e9e55e64b6a8a4e1ef7a185546d95.jpg', quant: '410g', type: 'Donuts', title: 'Beignet à nutella', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ', time: '30min', price: '100 dh' }
      ],
    }
  ];

  return (
    <>
      {Data.map((category, index) => (
        <div key={index}>
          {/* {category.colomns.map((item, itemIndex) => (
            <Credenza
              key={item.id}
              open={updateFormState}
              onOpenChange={setUpdateFormState}
              className="p-8 shadow-lg h-[45rem] w-[65rem] rounded-xl"
            >
              
              <CredenzaContent className=" flex max-h-screen bg-white">
              
              <CredenzaHeader photo={item.image}>
                   
                    <CredenzaClose asChild>
                      
                      <div className="close-icon" onClick={toggleModal}>
                        
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-lg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      
                    </CredenzaClose>
                    

                  </CredenzaHeader>
                <CredenzaBody className="space-y-4 text-center text-sm sm:pb-0 sm:text-left">
                  <CredenzaTitle>{item.title}</CredenzaTitle>
                  <p className="m-0 text-neutral-400">{item.description}</p>
                  <div className='flex items-center justify-center '>
                    <span>{item.quant}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dot mx-1 " viewBox="0 0 16 16" style={{ color: '#28509E' }}>
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                    </svg>
                    <span>{item.price}</span>
                  </div>
                </CredenzaBody>
                <CredenzaFooter>
                  <button
                    type="button"
                    onClick={() => listAchat(item.id)}
                    className="rounded-[1rem] p-2 text-black bg-[#28509E] hover:bg-[#28509E] font-medium text-xs md:text-sm flex items-center justify-center gap-1 "
                  >
                    <div className="text-lg font-semibold">Add to selected: {item.price}</div>
                  </button>
                  <CredenzaClose asChild>
                    <button variant="outline">Close</button>
                  </CredenzaClose>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          ))} */}
        </div>
      ))}
    </>
  );
}

export default Dettaille;
