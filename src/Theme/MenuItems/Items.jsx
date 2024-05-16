
import { Button, buttonVariants } from "@/components/ui/button";
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import React, { useState, useEffect, useContext } from 'react';
import { tabAchat } from '../constant/page';
import { Data } from '../constant/page';


const MenuItem = ({ type, cartCount, setCartCount }) => {
  const [data, setData] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [newtab, setNewtab] = useState(tabAchat);
  const [quantities, setQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedItem, setSelectedItem ]=useState(null);

  useEffect(() => {
    switch (type) {
      case 'burger':
        setData(Data.Burgers);
        break;
      case 'donuts':
        setData(Data.Donuts);
        break;
      case 'pizza':
        setData(Data.Pizza);
        break;
      case 'sandwich':
        setData(Data.Sandwich);
        break;
      default:
        setData([]);
    }
  }, [type]);

  const listAchat = (id, type) => {
    setNewtab((prevTab) => [...prevTab, data[id - 1]]);
    setCartCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    tabAchat.length = 0;
    tabAchat.push(...newtab);
  }, [newtab]);

 

  const toggleModal = (item) => {
    setSelectedItem(item); 
    setIsModalOpen(!isModalOpen);
  };
  
  return (
    <>
    
      
        <div className="content-container">
          <div className="container m-0.5">
            <div className="flex flex-col">
              <div className="flex items-center">
                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl mr-4">{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <hr className="border-t-2 w-full bg-white" />
              </div>
              
              {data.map((item, index) => (
                <Credenza key={index} open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <CredenzaTrigger asChild>
                    <Button>
                      <div className="relative shadow-md rounded-[10px] border-gray-300 border inline-block">
                        <div
                          className="tab items-center justify-center h-auto w-[150px] overflow-hidden p-1.5 text-lg font-semibold rounded-[8px] cursor-pointer transition-colors"
                        >
                          <img src={item.image} alt="Menu Icon" className="w-full object-cover rounded-[10px] h-32" />
                          <div className='text-black flex justify-between items-center py-2 px-3'>
                            <div>
                              <h2 className="text-[16px] mb-0 ">{item.title}</h2>
                              <p className='text-sm'>{item.price}</p>
                            </div>
                            <button type="button" onClick={() => toggleModal(item)} className="text-white leading-0 bg-[#28509E] hover:bg-[#28509E] w-[30px] h-[30px] flex items-center justify-center rounded-[8px]">
                              <AiOutlinePlus
                                style={{
                                  color: "#ffffff",
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Button>
                  </CredenzaTrigger>
                  <CredenzaContent className="max-h-[100vh]">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dot mx-1 " viewBox="0 0 16 16" style={{ color: '#ffbf00' }}>
                          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                        </svg>
                        <span>{item.price}</span>
                      </div>
                    </CredenzaBody>
                    <CredenzaFooter>
                      <button
                        type="button"
                        onClick={() => listAchat(item.id)}
                        className="rounded-[1rem] p-2 text-black bg-amber-500 hover:bg-amber-600 font-medium text-xs md:text-sm flex items-center justify-center gap-1 "
                      >
                        <div className="text-lg font-semibold">Add to selected: {item.price}</div>
                      </button>
                      <CredenzaClose asChild>
                        <Button variant="outline">Close</Button>
                      </CredenzaClose>
                    </CredenzaFooter>
                  </CredenzaContent>
                </Credenza>
              ))}
            </div>
          </div>
        </div>
      
    </>
  );
}

export default MenuItem;
