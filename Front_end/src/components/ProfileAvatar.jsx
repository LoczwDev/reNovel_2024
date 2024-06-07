import React, { useState } from "react";
import { stable } from "../constants";
import { AiOutlineCamera } from "react-icons/ai";
import { createPortal } from "react-dom";
import { CropAvatar } from "./crop/CropAvatar";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileAvatar } from "../services/index/users";
import toast from "react-hot-toast";
import { userActions } from "../store/reducers/userReducers";

export const ProfileAvatar = ({ avatar, checkEdit }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [cropOpen, setCropOpen] = useState(false);
  const [photo, setPhoto] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfileAvatar({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setCropOpen(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Avatar đã được Xóa");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handlerFile = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setCropOpen(true);
  };

  const handlerDeleteAvatar = () => {
    if (window.confirm("Bạn có muốn xóa tấm ảnh này không?")) {
      try {
        const formData = new FormData();
        formData.append("profileAvatar", undefined);
        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      {cropOpen &&
        createPortal(
          <CropAvatar photo={photo} setCropOpen={setCropOpen} />,
          document.getElementById("portal")
        )}
      <div className="w-full flex items-center gap-x-4 ">
        <div className="relative w-20 h-20 rounded-full outline-offset-2 outline-1 outline-primary overflow-hidden">
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={stable.UPLOAD_FOLDER_BASE_URL + avatar}
                className="w-full object-cover"
                alt="profileAvatar"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 justify-center flex items-center">
                <AiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            onChange={handlerFile}
            type="file"
            id="avatar"
            disabled={!checkEdit}
            className="sr-only"
          />
        </div>
        {checkEdit && (
          <button
            onClick={handlerDeleteAvatar}
            type="button"
            className="border border-red-500 rounded-lg px-4 text-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
};
