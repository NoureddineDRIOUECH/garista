import { axiosInstance } from "../../axiosInstance"
import { APIURL } from "../../lib/ApiKey";

export const adduser = async () => {
    try{
       const response = await axiosInstance.po
    }
    catch(error){

    }
}

export const  getUserById = async (id) => {
    
    try {
      const response = await axiosInstance.get(`${APIURL}/api/users/${id}`);
  
      if (response.status === 200) {
        console.log("The Response of User => ", response.data.users);
      }
      return response.data.users;
    } catch (error) {
      console.error('Error User:', error);
    }
  }
export const  getStaffById = async (id) => {
    
    try {
      const response = await axiosInstance.get(`${APIURL}/api/staffs/${id}`);
  
      if (response.status === 200) {
        console.log("The Response of User => ", response.data.users);
      }
      return response.data;
    } catch (error) {
      console.error('Error User:', error);
    }
  }

export const updateUser = async ({
  id,
  first_Name
}) => {
  try {
    const response = await axiosInstance.get(`${APIURL}/api/users/${id}`, {
      first_Name: first_Name
    });

    if (response.status === 200) {
      console.log("The Response of User => ", response.data.users);
    }
    return response.data.users;
  } catch (error) {
    console.error('Error User:', error);
  }
}