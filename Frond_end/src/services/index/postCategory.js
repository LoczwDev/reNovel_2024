import axios from "axios";

export const getAllCategory = async () => {
  try {
    const { data } = await axios.get(`/api/post-category`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const createCategory = async ({ title }) => {
  try {
    const { data } = await axios.post(`/api/post-category`, { title });
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const deleteCategory = async ({ categoryId }) => {
  try {
    const { data } = await axios.delete(`/api/post-category/${categoryId}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const updateCategory = async ({ categoryId, title }) => {
  try {
    const { data } = await axios.put(`/api/post-category/${categoryId}`, {
      title,
    });
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getDetailCategory = async ({ categoryId }) => {
  try {
    const { data } = await axios.get(`/api/post-category/${categoryId}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
