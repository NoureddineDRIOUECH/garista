import { useEffect, useState } from "react";
// import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import Login from "./authentification/page";
import Context from "./context/Context";
import { LoginProvider } from "../actions/Authentification/LoginProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient } from "react-query";
import axios from "axios";
import { APIURL } from "../lib/ApiKey";
// import { CartProvider } from "./context/CartContext";
function App() {

  const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/users`);
                setUsers(response.data.users); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleImageUpdate = async (userId, newImage) => {
        try {
            const formData = new FormData();
            formData.append('image', newImage);

            const response = await axios.post(`${APIURL}/api/users/${userId}/update-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };
  return (
    <>
    {/* <Context> */}
            <LoginProvider>
                {/* <CartProvider> */}
                    <Toaster />
                    <RouterProvider router={router}></RouterProvider>
                {/* </CartProvider> */}
            </LoginProvider>
    {/* </Context> */}

    </>
  );
}

export default App;
