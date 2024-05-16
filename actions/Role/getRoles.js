import { axiosInstance } from "../../axiosInstance";

export const getRoles = async () => {
   try{
       const response = await axiosInstance.get('/api/roles');
       if(response.status == 200){
          console.log("The Data is returned with successfully");
       }
       return response.data.roles;
   }
   catch(error){
    console.log("The Error => ", error);
   }
}

export const getRolesById = async (id) => {
   try{

      if (!id) {
         console.log("ID is undefined");
         return null; // Return null if ID is undefined
       }
       const response = await axiosInstance.get('/api/roles/' + id);
       if(response.status == 200){
          console.log("The Data of role is returned with successfully");
       }
       return response.data;
   }
   catch(error){
    console.log("The Error => ", error);
   }
}