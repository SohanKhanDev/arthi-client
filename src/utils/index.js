import axios from "axios";

//LINK - img upload
/** ---* image upload *--- **/
export const imageupload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );

  return data?.data?.display_url;
};

//LINK - save or update user into db
/** ---* save or update user into db *--- **/
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/users`,
    userData
  );

  return data;
};
