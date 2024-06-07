import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUserProfile, updateProfile } from "../../../services/index/users";
import { userActions } from "../../../store/reducers/userReducers";
import { ProfileAvatar } from "../../../components/ProfileAvatar";
import { CiEdit } from "react-icons/ci";

export const InfoUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const [checkEdit, setCheckEdit] = useState(false);
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const { mutate, isLoading, upadateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile đã được update");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/login");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading || !profileData ? "" : profileData.name,
        email: profileIsLoading || !profileData ? "" : profileData.email,
      };
    }, [profileData?.name, profileData?.email, profileIsLoading]),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
    setCheckEdit(false);
  };
  return (
    <div>
      <div className="w-full flex justify-end">
        {" "}
        <button onClick={() => setCheckEdit(!checkEdit)}>
          <CiEdit className="text-end text-2xl" />
        </button>
      </div>

      <div className="w-full max-w-md mx-auto border border-violet p-4 rounded-2xl">
        {/* {profileData?.name} */}
        <ProfileAvatar avatar={profileData?.avatar} checkEdit={checkEdit} />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col mb-6 w-full mt-3">
            <label htmlFor="name" className="text-gray-500 font-semibold block">
              Name
            </label>
            {checkEdit ? (
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 2,
                    message: "Phải dài hơn 1 ký tự",
                  },
                  required: {
                    value: true,
                    message: "Không được để trống",
                  },
                })}
                placeholder="Enter name"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
            ) : (
              <p className="text-2xl">{userState?.userInfo?.name}</p>
            )}
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
            {checkEdit ? (
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
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
            ) : (
              <p className="text-2xl">{userState?.userInfo?.email}</p>
            )}
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
              New Password
            </label>
            {checkEdit ? (
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
            ) : (
              <p className="text-2xl">********************</p>
            )}
            {errors.password?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          {checkEdit && (
            <button
              type="submit"
              disabled={
                !isValid ||
                profileIsLoading ||
                upadateProfileIsLoading ||
                !checkEdit
              }
              className="bg-violet text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Lưu Thông tin
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
