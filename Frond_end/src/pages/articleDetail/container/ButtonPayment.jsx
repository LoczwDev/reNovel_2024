import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getfilePdf } from "../../../services/index/libraryPdf";
import { getPaymentPdfById } from "../../../services/index/paymentPdf";
import { useSelector } from "react-redux";

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

export const ButtonPayment = ({ postId, slug }) => {
  const userState = useSelector((state) => state.user);
  const priceValue = 500;
  const {
    data: dataFilePdf,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getfilePdf({ postId }),
    queryKey: ["getfilePdf", postId],

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const pdfId = dataFilePdf?._id;
  const token = userState?.userInfo?.token;
  const { data: dataPayment } = useQuery({
    queryFn: () => getPaymentPdfById({ pdfId, token: token ? token : null }),
    queryKey: ["getPaymentPdfById", pdfId],
    enabled: pdfId !== undefined,
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <>
      {!pdfId && (
        <div>
          <p className="text-green-400 font-bold text-lg">
            Bài đăng này không kèm file truyện
          </p>
        </div>
      )}
      <div className={dataPayment?.checked || !dataFilePdf ? "hidden" : ""}>
        <form
          action="http://localhost:5000/api/create-checkout-session"
          method="POST"
        >
          <input type="hidden" name="price" value={priceValue} />
          <input type="hidden" name="pdfId" value={dataFilePdf?._id} />
          <input type="hidden" name="slug" value={slug} />
          <button
            disabled={!userState?.userInfo}
            type="submit"
            className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-purple-600 mt-3 px-4 py-4 rounded-lg tracking-wide text-white"
          >
            500.000vnd
          </button>
          <p
            className={`${
              userState?.userInfo ? "hidden" : ""
            } text-red-400 text-center font-semibold`}
          >
            Bạn cần phải đăng nhập để có thể tiến hành thanh toán
          </p>
        </form>
      </div>
    </>
  );
};
