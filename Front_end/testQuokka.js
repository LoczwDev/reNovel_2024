import axios from "axios";

export const lPosts = async () => {
  try {
    const { data } = await axios.get("/api/posts");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getDetailsPost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`/api/posts/${slug}`);
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};