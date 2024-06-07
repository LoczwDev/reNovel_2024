import React, { useEffect } from "react";
import MainLayout from "../MainLayout";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

export const SuccsessPage = () => {
  const userState = useSelector((state) => state.user);
  const { pdfId, slug } = useParams();
  const token = userState.userInfo.token;

  useEffect(() => {
    const updatePaymentPdf = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post(`/api/payment/`, { pdfId }, config);
        console.log("PaymentPdf updated successfully.");
      } catch (error) {
        console.error("Error updating PaymentPdf:", error);
      }
    };

    updatePaymentPdf();
  }, [pdfId]);
  return (
    // <!-- component -->
    <MainLayout>
      <div className="bg-gray-100">
        <div className="bg-white p-6 mx-auto flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Thanh Toán Hoàn Thành
            </h3>
            <p className="text-gray-600 my-2">
              Cảm ơn bạn đã hoàn tất thanh toán trực tuyến an toàn của chúng bạn
              tôi.
            </p>
            <p>Chúc bạn một ngày tuyệt vời!</p>
            <div className="py-10 text-center">
              <Link
                to={`/article/${slug}`}
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg"
              >
                Trở Lại Trang Chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
