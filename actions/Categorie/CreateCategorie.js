import { axiosInstance } from "../../axiosInstance";

export const addCategorie = async ({
    name,
    image
}) => {
    try{
       const response = await axiosInstance.post("/api/categories", {
        name,
        image,
        resto_id: 1
       },
        {
            headers: {
                "Accept": "application/json"
            }
        }
       ).then((res) => console.log("The Response => ", res.data))
       .catch(err => console.log(err))

       return response;
    }
    catch(err){
        console.log("The Error");
    }
}

export const deleteCategorie = async (id) => {
    try{
        const response = await axiosInstance.delete("/api/categories/" + id,
            {
                headers: {
                    "Accept": "application/json"
                }
            }
           ).then((res) => console.log("The Response => ", res.data))
           .catch(err => console.log(err))
    
           return response;
    }
    catch(err)
    {
        console.log("The Error => ", err);
    }
}

export const updateCategorie = async ({
    id,
    name,
    visibility,
    image
}) => {
    try{
        const respone = await axiosInstance.put('/api/categories/' + id, {
            name: name,
            visibility: visibility,
            image: image
        }
        );
        if(respone)
        {
          console.log("The Response  => ", respone);
        }
      return respone.data  
     }
     catch(error){
       console.log("The Error => ", error);
     }
 }
