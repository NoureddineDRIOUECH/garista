import { axiosInstance } from "../../axiosInstance";


export const deleteBanner = async (id) => {
    try{
       const res = await axiosInstance.delete('/api/banners/'+id);
       if(res)
       {
        console.log("The Response Deleted => ",res);
       }

       return res.data;
    }
    catch(err)
    {
        console.log('The Error => ',err);
    }
}
export const addBanner = async ({image, title}) => {

    console.log("The Image => ", image);
    try{
       const res = await axiosInstance.post('/api/banners/', {
        title: title,
        image: image,
        resto_id: 1
       });
       if(res)
       {
        console.log("The Response Added => ",res);
       }

       return res.data;
    }
    catch(err)
    {
        console.log('The Error => ',err);
    }
}

export const getBannerById = async (id) => {

    try{
       const res = await axiosInstance.get('/api/showBanner/'+id);
       if(res)
       {
        console.log("The Response Added => ",res);
       }

       return res.data;
    }
    catch(err)
    {
        console.log('The Error => ',err);
    }
}

export const updateBanner = async (id) => {

    try{
       const res = await axiosInstance.put('/api/banners/'+id);
       if(res)
       {
        console.log("The Response Added => ",res);
       }

       return res.data;
    }
    catch(err)
    {
        console.log('The Error => ',err);
    }
}