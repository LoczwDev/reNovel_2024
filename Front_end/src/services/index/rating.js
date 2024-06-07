import axios from "axios";

export const createRating = async ({ token, postId, score }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `/api/ratings/${postId}`,
      { score },
      config
    );

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

export const getRatingByPost = async ({ postId }) => {
  try {
    const { data } = await axios.get(`/api/ratings/${postId}`);

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
