import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { stable } from "../../../constants";
import { getfilePdf } from "../../../services/index/libraryPdf";
import { getPaymentPdfById } from "../../../services/index/paymentPdf";
import { useSelector } from "react-redux";

export const ButtonDownPdf = ({ postId }) => {
  const userState = useSelector((state) => state.user);

  const {
    data: dataFilePdf,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getfilePdf({ postId }),
    queryKey: ["getfilePdf", postId],
    enabled: postId !== undefined, 
    staleTime: Infinity,
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const pdfId = dataFilePdf?._id;
  const { data: dataPayment } = useQuery({
    queryFn: () =>
      getPaymentPdfById({ pdfId, token: userState?.userInfo?.token }),
    queryKey: ["getPaymentPdfById", pdfId],
    enabled: postId !== undefined,
    staleTime: Infinity,
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const handleDownload = async () => {
    if (!dataFilePdf) {
      toast.error("Không tìm thấy dữ liệu");
      return;
    }

    try {
      const response = await fetch(
        stable.UPLOAD_FOLDERPDF_BASE_URL + dataFilePdf.pdf
      );
      if (!response.ok) {
        throw new Error("Không thể tải xuống file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", dataFilePdf?.pdf);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Lỗi khi download", error);
      toast.error("Lỗi khi download");
    }
  };

  return (
    <div>
      {!isLoading && !isError && dataFilePdf && dataPayment && (
        <button
          onClick={handleDownload}
          className="relative group overflow-hidden pl-6 h-14 flex space-x-6 items-center bg-purple-500"
        >
          <span className="relative uppercase text-base text-white">
            Download
          </span>
          <div
            aria-hidden="true"
            className="w-14 bg-purple-600 transition duration-300 -translate-y-7 group-hover:translate-y-7"
          >
            <div className="h-14 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 m-auto fill-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="h-14 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 m-auto fill-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
