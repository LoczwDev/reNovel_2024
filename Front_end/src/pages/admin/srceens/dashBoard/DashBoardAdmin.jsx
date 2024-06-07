import React from "react";
import { FaMessage } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { useSelector } from "react-redux";
import { Admin } from "../Admin";
import { ChartDisplay } from "../../components/ChartDisplay";
import { ButtonTheme } from "../../../../components/container/ButtonTheme";
import { getAllPayment } from "../../../../services/index/paymentPdf";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const DashBoardAdmin = () => {
  const userState = useSelector((state) => state.user);

  const {
    data: paymentData,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getAllPayment({}),
    queryKey: ["payment"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const convertedAmount = paymentData?.length * 500000;
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(convertedAmount);
  // console.log(formattedAmount, "lll");
  return (
    <section className="h-auto">
      {/* Header */}
      <div>
        <h1 className="font-bold text-xl mb-5">Quản lý Admin</h1>
        <div className="flex items-center justify-between border-b w-full py-7">
          <div className=" lg:flex items-center justify-center gap-x-2">
            <div className="border-r-2">
              <span className="lg:px-2">Quản trị viên kết nối</span>
            </div>
            <p className="font-bold text-purple-500">
              {userState?.userInfo?.name}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-3">
              <ButtonTheme />
              <p className="text-lg font-bold lg:block hidden">Chế độ</p>
            </div>
            <div className="px-3 py-3 border rounded-xl hover:bg-black hover:text-white duration-200 ">
              <FaMessage />
            </div>
            <button className="px-3 py-2 border border-black bg-black text-white font-semibold text-center hover:bg-white hover:text-black rounded-xl duration-200">
              Open
            </button>
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="py-3">
        <div className="flex justify-between w-full gap-x-11 lg:flex-row flex-col">
          <div className="lg:w-1/2 w-full">
            <div>
              <p className="font-bold text-lg my-3">Số Liệu Thống Kê</p>
              <div className="flex bg-green-100 justify-between ">
                <div className=" rounded-2xl  flex flex-col p-3 text-black font-bold text-xl">
                  <span>Good day,</span>
                  <p> {userState?.userInfo?.name}</p>
                  <button className="my-2 px-3 py-2 text-base rounded-xl bg-white w-40 hover:bg-black hover:text-white font-bold duration-200">
                    Start tracking
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center px-5">
                  <h2 className="text-lg font-bold">Tổng doanh thu</h2>
                  <p className="font-semibold text-green-400 text-lg">{formattedAmount}</p>
                </div>
              </div>
              <Admin />
              <div className="mt-3">
                <div className="bg-purple-100 rounded-2xl  flex flex-col p-3 text-black font-bold text-xl">
                  <span>Nhiệm vụ hằng ngày</span>
                  <p className="font-normal text-sm my-3">
                    0 trên 3 hoàn thành
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-between">
            <ChartDisplay />
            <div>
              <p className="font-bold text-lg my-3">Nhiệm Vụ Hôm Nay Của Bạn</p>
              <div className="border rounded-2xl">
                <div className="flex flex-col p-3 text-black font-bold text-xl">
                  <div className="flex justify-between font-normal text-sm text-dark-light">
                    <span>Number 1</span>
                    <span>4h</span>
                  </div>
                  <span>Đăng Bài Mới</span>
                  <div className="flex items-center gap-x-2">
                    <MdError />
                    <span className="font-normal text-sm my-3">
                      {" "}
                      0 trên 2 hoàn thành
                    </span>
                  </div>
                </div>
              </div>

              {/* <div className="border rounded-2xl mt-3">
                <div className="flex flex-col p-3 text-black font-bold text-xl">
                  <div className="flex justify-between font-normal text-sm text-dark-light">
                    <span>Number 10</span>
                    <span>4h</span>
                  </div>
                  <span>Your daily plan</span>
                  <div className="flex items-center gap-x-2">
                    <MdError />
                    <span className="font-normal text-sm my-3">
                      {" "}
                      5 of 8 completed
                    </span>
                  </div>
                </div>
              </div> */}
              {/* <div className="border rounded-2xl mt-3">
                <div className="flex flex-col p-3 text-black font-bold text-xl">
                  <div className="flex justify-between font-normal text-sm text-dark-light">
                    <span>Number 10</span>
                    <span>4h</span>
                  </div>
                  <span>Your daily plan</span>
                  <div className="flex items-center gap-x-2">
                    <MdError />
                    <span className="font-normal text-sm my-3">
                      {" "}
                      5 of 8 completed
                    </span>
                  </div>
                </div>
              </div>
              <div className="border rounded-2xl mt-3">
                <div className="flex flex-col p-3 text-black font-bold text-xl">
                  <div className="flex justify-between font-normal text-sm text-dark-light">
                    <span>Number 10</span>
                    <span>4h</span>
                  </div>
                  <span>Your daily plan</span>
                  <div className="flex items-center gap-x-2">
                    <MdError />
                    <span className="font-normal text-sm my-3">
                      {" "}
                      5 of 8 completed
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
