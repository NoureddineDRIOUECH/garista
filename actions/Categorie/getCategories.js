import { axiosInstance } from "../../axiosInstance";

export const fetchCategorie = async () => {
  try {
    const response = await axiosInstance
      .get("/api/categories/")
    //   .then((res) => console.log("The Response => ", res.data))
    //   .catch((err) => console.log("The error => ", err));

    return response.data;
  } catch (err) {
    console.log("The Error => ", err);
  }
};
export const fetchCategorieById = async (id) => {
  try {
    const response = await axiosInstance
      .get("/api/showcategories/" + id)
    //   .then((res) => console.log("The Response => ", res.data))
    //   .catch((err) => console.log("The error => ", err));

    return response.data;
  } catch (err) {
    console.log("The Error => ", err);
  }
};
