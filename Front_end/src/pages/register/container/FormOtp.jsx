import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifiedOTP } from "../../../services/index/users";
import { Link, useNavigate } from "react-router-dom";

const FormOtp = ({ email }) => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "otp") {
      setOtp(value);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, otp }) => {
      return verifiedOTP({ email, otp });
    },
    onSuccess: (data) => {
      toast.success("Xác thực thành công");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // useEffect(() => {
  //   if (userState?.userInfo?.verified == true) {
  //     navigate("/");
  //   }
  // }, [navigate, userState?.userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email: email, otp: otp });
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden  py-12 rounded-3xl">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl border border-black">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Xác thực email</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Chúng tôi đã gửi mã qua email của bạn, vui lòng kiểm tra</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={index} className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp"
                        value={otp[index - 1] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      {isLoading ? "Chờ..." : "Xác thực tài khoản"}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Bạn đã nhận được mã?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gửi lại
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormOtp;
