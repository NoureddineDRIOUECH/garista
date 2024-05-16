import React, { createContext, useState } from 'react';
import { MdAddBox } from 'react-icons/md';
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { addCategorie, deleteCategorie } from '../../../actions/Categorie/CreateCategorie';
import { axiosInstance } from '../../../axiosInstance';
import { useEffect } from 'react';
import { fetchCategorie } from '../../../actions/Categorie/getCategories';
import CategorieCard from './CategorieCard';
import { APIURL } from '../../../lib/ApiKey';
import { Controller, useForm } from 'react-hook-form';
import './uploader.css';
import Spinner from 'react-spinner-material';
import FormAdd from './FormData';
import { toast } from "react-hot-toast";



function AddQrCode({props}) {
   
    const [Categories, setCategories] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const { control, handleSubmit, register, formState: { errors }, setError } = useForm();
    const [loading, setLoading] = useState(false)
    const [resotInfo, setRestoInfo] = useState([]) 

    const fetchCat = async (id) =>{
        // const result = await fetchCategorie();
        setLoading(true)
        try {
            const restoInfo = sessionStorage.getItem('RestoInfo');
            let Data = [];
            Data = JSON.parse(restoInfo)
            Data.map(item => {
               setRestoInfo(item)
               id = item.id;
            })
            const categorieDates = await axiosInstance.get('/api/categories/'+id); // Call the fetchCategorie function to get the data
            if(categorieDates)
            {
                console.log("The Categories => ",categorieDates);
                setCategories(categorieDates.data)
            }
            // const { Categories } = categorieData;
            // console.log("the cte => ", categorieData[0].image , "the name => ", categorieData[0].name);
            // const images = JSON.parse(categorieData[0].image); // Parse the JSON-encoded string to extract the array of image paths
            // setImageUrls(images);
          } catch (error) {
            console.error('Error fetching image URLs:', error);
          }
          finally{
            setLoading(false)
          }
        // console.log("resulat => ", result);
    }
    useEffect(() => {
        setName("")
        setFile("")
        fetchCat();
    }, [])
    const [name,setName] = useState("");
    const [images,setImages] = useState([]); // État pour stocker le rôle sélectionné
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [usersList, setUsersList] = useState([]);

    const handleDelete = () => {
        setFile(null);
        setFileName("");
        // setError('file', { type: 'required', message: 'Please select a file.' });

        // setImage(null);
      };

    

      const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        // setFile(selectedFile);
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            // setError('file', { type: 'manual', message: '' }); // Clear any previous error message
        }
    };
    const handleAddUser = async (data, toastMessage) => {
        console.log("The Images => ", data.image ? data.image : null);
        const formData = new FormData();
          // Append each selected image to the formData
        //   for (let i = 0; i < fileName.length; i++) {
            if(data.image)
                {
                    formData.append("image", data.image);
                }
        // }
        formData.append("name", data.name);
        formData.append("resto_id", resotInfo.id);
        try {
            const response = await fetch(`${APIURL}/api/categories`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Category added successfully");
                toast.success(toastMessage);
                fetchCat(resotInfo.id)
            } else {
                console.error("Failed to add category");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeleteCategrorie = async (itemId,categories) =>{
        try{
          
            const response = await axiosInstance.delete("/api/categories/" + itemId,
            {
                headers: {
                    "Accept": "application/json"
                }
            }
           )
            if(response)
            {
                console.log("The Response => ",response);
                toast.success("Categorie deleted");
                setCategories(categories.filter(item => item.id !== itemId));  
                                  // fetchCat()
            }
            else{
                console.log("not working");
            }
        }catch(err)
        {
            console.log("error => ", err);
        }
    } 

    const handleUpdate = async ({
        id,
        data,
        toastMessage
      }) => {

        console.log("The Data => ", id, data, toastMessage);
  
        try {
  
            const response = await axiosInstance.put(`/api/categories/${id}`, {
                name: data.name,
                visibility: data.visibility,
            }
            );
    
            if (response) {
                console.log("Banner Updated successfully", response.data);

                toast.success(toastMessage);
                fetchCat(resotInfo.id)
                
            } else {
                console.error("Failed to add category");
            }
  
        } catch (error) {
            console.error("Error:", error);
        }
     }


   
    console.log("The Olded Category: ", Categories);
    

    console.log("cate ", fileName , " Images => ", file);
    return (

        <>
            {
             loading
             ?
             <div className='justify-center items-center flex  h-[50vh]'>
               <Spinner size={100} spinnerColor={"#28509E"} spinnerWidth={1} visible={true} style={{borderColor: "#28509E", borderWidth: 2}}/>
             </div>
             :
             <>
             <div className='grid grid-cols-5 lg:gap-8 max-w-[1400px]'>

               {
               Categories.length > 0 && Categories.map((item, i) => (
                    <CategorieCard key={i} item={item}   handled={() => handleDeleteCategrorie(item.id, Categories)}
                    handleUpdate={handleUpdate}/>
                ))
               }

                <Dialog >
                    <DialogTrigger>
                        <Card className="w-[250px] h-[280px] border-dashed grid place-content-center">
                            <CardHeader className="text-center">
                                <CardTitle className="text-lg">Add Categories to sort your dishes and drinks type</CardTitle>


                            </CardHeader>
                            <CardContent>
                                    <button
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#ffffff',
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            console.log('Icon clicked');
                                        }}
                                    >
                                        <MdAddBox size={50} style={{ color: '#000' }} />
                                    </button>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-[50rem]">
                        <FormAdd categories={Categories} handleAddUser={handleAddUser}/>
                    </DialogContent>
                </Dialog>
               </div>
             </>
            }
        </>

    );
}

export default AddQrCode;