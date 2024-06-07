import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { signup } from "../../services/index/users";
import toast from "react-hot-toast";
import { userActions } from "../../store/reducers/userReducers";
import FormOtp from "./container/FormOtp";

const RegisterPage = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [isCheckOTP, setIsCheckOTP] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      // dispatch(userActions.setUserInfo(data));
      // localStorage.setItem("account", JSON.stringify(data));
      toast.success("Đã Gửi Email Xác Thực Cho Bạn");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
    setIsCheckOTP(true);
  };

  const password = watch("password");

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        {!isCheckOTP && (
          <div className="w-full max-w-sm mx-auto duration-500">
            <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
              Đăng Ký
            </h1>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="name"
                  className="text-gray-500 font-semibold block"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    minLength: {
                      value: 1,
                      message: "Độ dài tên phải có ít nhất 1 ký tự",
                    },
                    required: {
                      value: true,
                      message: "Bắt buộc",
                    },
                  })}
                  placeholder="Enter name"
                  className={`placeholder:text-[#959ead] dark:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                    errors.name ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="email"
                  className="text-gray-500 font-semibold block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Nhập email hợp lệ",
                    },
                    required: {
                      value: true,
                      message: "Bắt buộc",
                    },
                  })}
                  placeholder="Enter email"
                  className={`placeholder:text-[#959ead] dark:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                    errors.email ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {errors.email?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="password"
                  className="text-gray-500 font-semibold block"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Bắc buộc",
                    },
                    minLength: {
                      value: 6,
                      message: "Độ dài mật khẩu phải ít nhất 6 ký tự",
                    },
                  })}
                  placeholder="Enter password"
                  className={`placeholder:text-[#959ead] dark:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                    errors.password ? "border-red-500" : "border-[#c3cad9]"
                  }`}
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-500 font-semibold block"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Bắt buộc",
                    },
                    validate: (value) => {
                      if (value !== password) {
                        return "Mật khẩu không phù hợp";
                      }
                    },
                  })}
                  placeholder="Enter confirm password"
                  className={`placeholder:text-[#959ead] dark:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#c3cad9]"
                  }`}
                />
                {errors.confirmPassword?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="bg-violet text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Đăng Ký
              </button>
              <p className="text-sm font-semibold text-gray-500">
                Bạn có một tài khoản?{" "}
                <Link to="/login" className="text-violet">
                  Đăng Nhập
                </Link>
              </p>
            </form>
          </div>
        )}

        {isCheckOTP && <FormOtp email={email} className="duration-500" />}
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
