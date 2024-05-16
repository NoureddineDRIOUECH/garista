import React, { useState ,useEffect} from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Button, buttonVariants } from "@/components/ui/button";
import { IoIosAdd ,IoIosRemove } from "react-icons/io";
import {tabAchat} from '../constant/page'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeAll } from '../../lib/cartSlice';

import Dettaille from './Dettaille';
import { APIURL } from '../../../lib/ApiKey';
function MenuItems({dishes, selectedTab, restoId }) {
  const [selectedProp, setSelectedProp] = useState(0); // initialisation de l'état avec 0
  const [searchTerm, setSearchTerm] = useState(""); // état pour stocker la valeur de la recherche
  const [updateFormState, setUpdateFormState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newtab, setNewtab] = useState([...tabAchat]);
  const [selectedItem, setSelectedItem ]=useState(null);
  const [quantity, setQuantity] = useState(1)
  const Cat = [
    {
      type: "Burgers",
      colomns: [
        { id: 1, title: 'Burgers', url: '/', image: "/public/photo/burger4.jpeg", price: "59dh"  ,description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ',},
        { id: 2, title: 'Burgers', url: '/Burgers', image: "/public/photo/burger4.jpeg", price: "59dh"  ,description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ',},
        { id: 3, title: 'Pizza', url: '/Pizza', image: "/public/photo/burger4.jpeg", price: "59dh"  ,description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ',},
        { id: 4, title: 'Donuts', url: '/Donuts', image: "/public/photo/burger4.jpeg", price: "59dh"  ,description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ',},
        { id: 5, title: 'Sandwich', url: '/Sandwich', image: "/public/photo/burger4.jpeg", price: "59dh"  ,description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ',},
        { id: 6, title: 'Salades', url: '/Salades', image: "/public/photo/burger4.jpeg", price: "59dh"  ,description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus doloribus maiores provident, non itaque a quia hic iste ',},
      ]
    }
  ];

  // Filtrer les éléments en fonction du terme de recherche
  const filteredCategories = dishes.length > 0 && dishes.filter(item =>
    // category.some(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    // )
  );
  const toggleModal = (item) => {
    setSelectedItem(item); 
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    tabAchat.length = 0;
    tabAchat.push(...newtab);
  }, [newtab]);
  const listAchat = (id) => {
    setNewtab((prevTab) => [...prevTab, Cat[id - 1]]);
    setCartCount((prevCount) => prevCount + 1);
  };

  // const { addToCart, cartItems } = useCart();
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const handleAddItem = (product, quantity) => {
    dispatch(addItem({ product, quantity: quantity, resto_id: restoId }));
  };
  const handleRemoveAll  = product => {
    dispatch(removeAll());
  };
  // const onPreview = (item) => {
  //   previewModal.onOpen(item);
  // };

  console.log("The Cart => ", cartItems);
  return (
    <>
      <div className='pt-6'>
        <form className="max-w-md mx-auto px-4 pb-4">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[.5rem] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-height-small" placeholder="Search Mockups, Logos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required />
          </div>
        </form>

        <div className='overflow-x-auto pl-4 '>
          <h1 className='pb-2 text-lg text-black font-semibold'>{selectedTab}</h1>
          <div className='grid grid-cols-2'>
            {filteredCategories.length > 0 && filteredCategories.map((item, index) => (
                <div className="tabs-container overflow-x-auto pl-4" key={index}>
                  <div className="flex gap-4">
                <Credenza key={item.id} className={"!bg-white"} open={isModalOpen} onOpenChange={setIsModalOpen} >
                        <CredenzaTrigger asChild className="h-auto !bg-white">
                          <Button className="px-0" >
                        <div key={item.id} className="relative shadow-md rounded-[10px] border-gray-300 border inline-block">
                          <div
                            onClick={() => setSelectedItem(item)}
                            className="tab items-center justify-center h-auto w-[150px] overflow-hidden p-1.5 text-lg font-semibold rounded-[8px] cursor-pointer transition-colors"
                          >
                            <img src={`${APIURL}/storage/${item.image}`} alt="Menu Icon" className="w-full object-cover rounded-[10px] h-32" />
                            <div className='text-black flex justify-between items-center py-2 px-3'>
                              <div>
                                <h2 className="text-[16px] mb-0 ">{item.name}</h2>
                                <p className='text-sm'>{item.price}</p>
                              </div>
                              
                              <button type="button" onClick={handleAddItem} className="text-white leading-0 bg-[#28509E] hover:bg-[#28509E] w-[30px] h-[30px] flex items-center justify-center rounded-[8px]">
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
                      <CredenzaContent className=" flex max-h-screen bg-white ">
                    {
                      selectedItem != null &&
                      (
                        <>
                        <CredenzaHeader photo={`${APIURL}/storage/${selectedItem.image}`} className="p-0">
                            
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
                            <CredenzaTitle>{selectedItem.name}</CredenzaTitle>
                            <p className="m-0 text-neutral-400">{selectedItem.description}</p>
                            <div className='flex items-center justify-center '>
                              <span className='grid grid-cols-3 font-bold '><IoIosAdd size={22}/><span className=' text-lg'>{quantity}</span><IoIosRemove size={22}/></span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dot mx-1 " viewBox="0 0 16 16" style={{ color: '#28509E' }}>
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                              </svg>
                              <span>{selectedItem.price}</span>
                            </div>
                          </CredenzaBody>
                          <CredenzaFooter>
                            <button
                              type="button"
                              onClick={()=>handleAddItem(selectedItem, quantity)}
                              className="rounded-[1rem] p-2 text-black bg-[#28509E] hover:bg-[#28509E] font-medium text-xs md:text-sm flex items-center justify-center gap-1 "
                            >
                              <div className="text-lg font-semibold text-white">Add to selected: {selectedItem.price}</div>
                            </button>
                            <CredenzaClose asChild>
                              <Button variant="outline bg-black text-white">Close</Button>
                            </CredenzaClose>
                          </CredenzaFooter>
                        </>

                      )
                    }
                  </CredenzaContent>
                    </Credenza>
                    
                  </div>
                </div>
            ))}
          </div>

          </div>
      </div>
          {/* <div className="dishes-container">
          {dishes.length > 0 && dishes.map(dish => (
            <div key={dish.id} className="dish">
              <img src={dish.image} alt={dish.title} />
              <div>
                <h3>{dish.name}</h3>
                <p>{dish.desc}</p>
                <p>{dish.price}</p>
              </div>
            </div>
          ))}
        </div> */}
       {/* <Dettaille updateFormState={updateFormState} setUpdateFormState={setUpdateFormState} /> */}
    </>
  );
}

export default MenuItems;