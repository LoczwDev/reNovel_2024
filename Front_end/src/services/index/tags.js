import axios from "axios";

export const getAllTags = async () => {
  try {
    const { data } = await axios.get(`/api/tags/`);

    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const createTags = async ({ title }) => {
  try {
    const { data } = await axios.post(`/api/tags/`, { title });

    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
export const updateTags = async ({ tagId, title }) => {
  try {
    const { data } = await axios.put(`/api/tags/${tagId}`, { title });

    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
export const deleteTags = async ({ tagId }) => {
  try {
    const { data } = await axios.delete(`/api/tags/${tagId}`);

    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
export const getTagById = async ({ tagId }) => {
  try {
    const { data } = await axios.get(`/api/tags/${tagId}`);

    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
