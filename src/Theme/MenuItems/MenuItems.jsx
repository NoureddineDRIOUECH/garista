import React, { useState, useEffect, useRef } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Button, buttonVariants } from "@/components/ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { tabAchat } from '../constant/page';
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
import Logo from './waiter-svgrepo-com.svg';
import './MenuItems.css'
import Dettaille from './Dettaille';
import { APIURL } from '../../../lib/ApiKey';

function MenuItems({ dishes, selectedTab, restoId, infoRes }) {
  const [selectedProp, setSelectedProp] = useState(0); // initialisation de l'état avec 0
  const [searchTerm, setSearchTerm] = useState(""); // état pour stocker la valeur de la recherche
  const [updateFormState, setUpdateFormState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newtab, setNewtab] = useState([...tabAchat]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [credenzaOpen, setCredenzaOpen] = useState(false);

  // Initial quantity
  const getQuantity = (itemId) => quantities[itemId] || 1;

  const setQuantity = (itemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value > 0 ? value : 1,
    }));
  };

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
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.blur(); // Ensure the input is not focused on mount
    }
  }, []);
  // Filtrer les éléments en fonction du terme de recherche
  const filteredCategories = dishes.length > 0 && dishes.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleModal = (item) => {
    setSelectedItem(item); 
    setIsModalOpen(!isModalOpen);
    setCredenzaOpen(!credenzaOpen);
    console.log("Selected Item: ", item);
  };

  useEffect(() => {
    tabAchat.length = 0;
    tabAchat.push(...newtab);
  }, [newtab]);

  const listAchat = (id) => {
    setNewtab((prevTab) => [...prevTab, Cat[id - 1]]);
    setCartCount((prevCount) => prevCount + 1);
  };

  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleAddItem = (product, quantity) => {
    dispatch(addItem({ product, quantity: quantity, resto_id: restoId }));
    setIsModalOpen(false); // Close the credenza after adding the item
  setCredenzaOpen(false);
  // setIsModalOpen(!isModalOpen);
  };

  const handleRemoveAll = product => {
    dispatch(removeAll());
  };

  console.log("The Cart => ", cartItems);

  return (
    <>
      <div className='pt-4 max-w-[520px] mx-auto'>
        <form className="max-w-md mx-auto px-4 pb-4">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" ref={searchInputRef} id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[.5rem] bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-height-small" placeholder="Search Mockups, Logos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />
          </div>
        </form>

        <div className='overflow-x-auto px-3 mx-auto'>
          <h1 className='pb-2 text-lg text-black font-semibold'>{selectedTab}</h1>
          <div className='grid grid-cols-2 gap-5 mb-[100px] lg:mb-[150px]'>
            {filteredCategories.length > 0 && filteredCategories.map((item, index) => (
              <div className="tabs-container overflow-x-auto" key={index}>
                <div className="flex gap-4">
                  <Credenza key={item.id} className={"!bg-white !py-0"} open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <CredenzaTrigger asChild className="h-auto w-full !py-0 !bg-white">
                      <Button className=" px-0">
                        <div key={item.id} className="relative shadow-md rounded-[10px] w-full border-gray-300 border inline-block">
                          <div
                            onClick={() => setSelectedItem(item)}
                            className="tab items-center justify-center h-full w-full overflow-hidden p-1.5 text-lg font-semibold rounded-[8px] cursor-pointer transition-colors"
                          >
                            <img src={`${APIURL}/storage/${item.image}`} alt="Menu Icon" className="w-full object-cover rounded-[10px] h-32" />
                            <div className='text-black flex justify-between items-center py-2 px-3'>
                              <div>
                                <h2 className="text-[12px] mb-0 text-left">{item.name.slice(0, 12)}</h2>
                                <p className='text-[12px] text-left'>{item.price + " " + infoRes.currency}</p>
                              </div>
                              
                              <button type="button" onClick={() => handleAddItem(item, 1)}              className={`text-white leading-0 bg-[#28509E] hover:bg-[#28509E] w-[30px] h-[30px] flex items-center justify-center rounded-[8px] add-to-cart-btn ${isClicked ? 'clicked' : ''}`}>
                                <AiOutlinePlus style={{ color: "#ffffff" }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Button>
                    </CredenzaTrigger>
                    <CredenzaContent className="flex max-h-screen bg-white">
                      {selectedItem != null && (
                        <>
                          <CredenzaHeader photo={`${APIURL}/storage/${selectedItem.image}`} className="p-0" />
                          <CredenzaBody className="space-y-4 text-center mt-5 text-sm sm:pb-0 sm:text-left">
                            <CredenzaTitle>{selectedItem.name}</CredenzaTitle>
                            <p className="m-0 text-neutral-400 hyphens-auto">{selectedItem.desc.length > 20 ? selectedItem.desc + '...' : selectedItem.desc}</p>
                            <div className='flex items-center justify-center '>
                              <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" onClick={() => setQuantity(selectedItem.id, getQuantity(selectedItem.id) - 1)}>
                                  <MinusIcon className="w-4 h-4" />
                                </Button>
                                <span className="text-base font-medium text-gray-900 dark:text-gray-50">{getQuantity(selectedItem.id)}</span>
                                <Button size="icon" variant="outline" onClick={() => setQuantity(selectedItem.id, getQuantity(selectedItem.id) + 1)}>
                                  <PlusIcon className="w-4 h-4" />
                                </Button>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dot mx-1 " viewBox="0 0 16 16" style={{ color: '#28509E' }}>
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                              </svg>
                              <span>{selectedItem.price + " " + infoRes.currency}</span>
                            </div>
                          </CredenzaBody>
                          <CredenzaFooter>
                            <button
                              type="button"
                              onClick={() => { handleAddItem(selectedItem, getQuantity(selectedItem.id)) }}
                              className={`rounded-[1rem] p-2 ${isClicked ? "bg-white" : "bg-[#28509E]"} transition-all duration-300 border border-[#28509E] font-medium text-xs md:text-sm flex items-center justify-center gap-1 `}
                            >
                              <div className={`text-lg font-semibold ${isClicked ? "text-[#28509E]" : "text-white"} `}>{isClicked ? "Added To Your Cart" : `Add to selected: ${(selectedItem.price * getQuantity(selectedItem.id)).toFixed(2) + " " + infoRes.currency}`}</div>
                            </button>
                            <CredenzaClose asChild>
                              <Button variant="outline bg-black text-white">Close</Button>
                            </CredenzaClose>
                          </CredenzaFooter>
                        </>
                      )}
                    </CredenzaContent>
                  </Credenza>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`mb-1 fixed bottom-16 right-2 flex items-center justify-center ${credenzaOpen ? 'hidden' : ''}`}>
        <Button className="h-16 w-16 rounded-full bg-[#28509E] text-white shadow-lg flex items-center justify-center" size="icon" variant="outline">
          <img src={Logo} alt="Waiter Icon" className="h-8 w-8 text-white fill-[#fff]" />
        </Button>
      </div>
    </>
  );
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default MenuItems;