import { axiosInstance } from "../../axiosInstance";

export const getRestaurant = async (id) => {
    try{
      
        const res = await axiosInstance.get('/api/getResto/'+id);
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