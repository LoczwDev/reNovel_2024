import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileAvatar } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userActions } from "../../store/reducers/userReducers";

export const CropAvatar = ({ photo, setCropOpen }) => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropPixels, setCropPixels] = useState(null);

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
      toast.success("Avatar đã được update");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handlerCropComplete = (cropArea, Pixels) => {
    setCropPixels(Pixels);
  };

  const handlerCropImg = async () => {
    try {
      const cImg = await getCroppedImg(photo?.url, cropPixels);
      const file = new File([cImg.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });

      const formData = new FormData();
      formData.append("profileAvatar", file);
      mutate({ token: userState.userInfo.token, formData: formData });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <div className="fixed z-[500] inset-0 flex justify-end p-5 overflow-auto mr-10">
      <div className="bg-white h-fit w-full sm:max-w-[450px] p-5 rounded-lg border border-gray-600">
        <h2 className="font-semibold text-dark-light mb-2">Cắt Ảnh</h2>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handlerCropComplete}
          />
        </div>
        <div>
          <label
            className="block mb-1 text-sm font-medium text-gray-900"
            htmlFor="zoom"
          >
            Zoom: {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            name=""
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <button
            disabled={isLoading}
            onClick={() => setCropOpen(false)}
            className="px-5 p-3 rounded-lg text-red-500 border border-red-400 text-sm disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handlerCropImg}
            className="px-5 p-3 rounded-lg text-blue-500 border border-blue-400 text-sm disabled:opacity-70"
          >
            Cắt và Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
