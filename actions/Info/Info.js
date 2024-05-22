import { axiosInstance } from "../../axiosInstance";

export const getInfo = async (id) => {
    try{

        const res = await axiosInstance.get('/api/infos/'+id)
        if(res){
            console.log("The Restaurant => ",res);
        }
      return res.data;
    }
    catch(err)
    {
        console.log('The Error => ',err);
    }
}