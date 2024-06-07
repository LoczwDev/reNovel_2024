import axios from "axios";

export const createFilePDF = async ({ postId, formData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `/api/libraryPdf/${postId}`,
      formData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getfilePdf = async ({ postId }) => {
  try {
    //     const config = {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };

    const { data } = await axios.get(`/api/libraryPdf/${postId}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
