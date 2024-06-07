import axios from "axios";

// export const createFilePDF = async ({ postId, formData, token }) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await axios.post(
//       `/api/libraryPdf/${postId}`,
//       formData,
//       config
//     );
//     return data;
//   } catch (error) {
//     if (error.response && error.response.data.message)
//       throw new Error(error.response.data.message);
//     throw new Error(error.message);
//   }
// };

export const getPaymentPdfById = async ({ pdfId, token }) => {
  try {
    // Kiểm tra xem pdfId có tồn tại không
    if (!pdfId) {
      throw new Error("pdfId is undefined");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/payment/${pdfId}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllPayment = async () => {
  try {


    const { data } = await axios.get(`/api/payment/`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
