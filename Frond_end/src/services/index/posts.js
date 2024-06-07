import axios from "axios";

export const getAllPosts = async ({
  searchKeyWord = "",
  page = 1,
  limit = 10,
  category = "",
  country = "",
  status = "",
  tags = "",
  sort = "",
}) => {
  try {
    const { data, headers } = await axios.get(
      `/api/posts?searchKeyWord=${searchKeyWord}&page=${page}&limit=${limit}&category=${category}&country=${country}&status=${status}&tags=${tags}&sort=${sort}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getAllPostHome = async () => {
  try {
    const { data } = await axios.get(`/api/posts`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getAllPostsAdmin = async () => {
  try {
    const { data, headers } = await axios.get(`/api/posts`);
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// export const getAllPostHome = async () =>
//   // searchKeyWord = "",
//   // page = 1,
//   // limit = 10,
//   // category = "",
//   // country = "",
//   // status = "",
//   // sort = ""
//   {
//     try {
//       const { data, headers } = await axios.get(`/api/posts`);
//       return { data, headers };
//     } catch (error) {
//       if (error.response && error.response.data.message)
//         throw new Error(error.response.data.message);
//       throw new Error(error.message);
//     }
//   };

export const getDetailsPost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`/api/posts/${slug}`);
    // console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getPostUser = async ({ userId }) => {
  try {
    const { data } = await axios.get(`/api/posts/user/${userId}`);
    // console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
// export const increaseViewPost = async ({ postId }) => {
//   try {
//     const { data } = await axios.put(`/api/posts/view/${postId}`);
//     // console.log(data);
//     return data;
//   } catch (error) {
//     if (error.response && error.response.data.message)
//       throw new Error(error.response.data.message);
//     throw new Error(error.message);
//   }
// };

export const deletePost = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/posts/${slug}`, config);
    // console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updatePost = async ({ updateData, slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/${slug}`, updateData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createPost = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`/api/posts/`, {}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const checkPost = async ({ postIds }) => {
  try {
    const { data } = await axios.put("/api/posts/checked/mutilpost", {
      postIds,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
