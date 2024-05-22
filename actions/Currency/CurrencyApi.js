import { axiosInstance } from "../../axiosInstance";

export const getCurrency = async () => {
    try{
      
        const res = await axiosInstance.get('/api/currencies');
        if(res){
            console.log("The Response Get succeeded => ", res);
        }

        return res.data;
    }
    catch(err)
    {
        console.log("The Error => ",err);
    }
}