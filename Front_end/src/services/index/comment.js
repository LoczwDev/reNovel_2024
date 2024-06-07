import axios from "axios";

export const createComment = async ({
  token,
  desc,
  slug,
  parent,
  replyOnUser,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/comments",
      {
        desc,
        slug,
        parent,
        replyOnUser,
      },
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateComment = async ({ token, desc, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/comments/${commentId}`,
      {
        desc,
      },
      config
    );
    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteComment = async ({ token, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`/api/comments/${commentId}`, config);
    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllComments = async ({ valueSearch }) => {
  try {
    const encodedValueSearch = encodeURIComponent(valueSearch);
    const { data } = await axios.get(
      `/api/comments/?search=${encodedValueSearch}`
    );
    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
export const checkComments = async ({ commentIds }) => {
  try {
    const { data } = await axios.put(`/api/comments/check/multiComments`, {
      commentIds,
    });
    if (data) {
      return data;
    } else {
      throw new Error("Lỗi không có dữ liệu từ phản hồi");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
