import axios from "axios";

export const createFavorite = async ({ token, postId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`/api/favorites/${postId}`, {}, config);

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

export const getFavoriteByUser = async ({ userId }) => {
  try {
    const { data } = await axios.get(`/api/favorites/${userId}`);

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
export const getCountFavorite = async ({ postId }) => {
  try {
    const { data } = await axios.get(`/api/favorites/count/${postId}`);
    // console.log(data, "loc");
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
