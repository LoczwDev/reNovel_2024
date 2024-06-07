import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa6";
import {
  createFavorite,
  getCountFavorite,
  getFavoriteByUser,
} from "../../../services/index/favorite";

export const FavoriteDetails = ({ userState, postId }) => {
  const [isCheckFavorite, setIsCheckFavorite] = useState(false);
  const userId = userState?.userInfo?._id;
  const {
    data: dataFavorite,
    isLoading: isLoadingGetFavorite,
    refetch,
  } = useQuery({
    queryFn: () => getFavoriteByUser({ userId }),
    queryKey: ["favorites"],
    enabled: userId != undefined,
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  //  SoSanhISCHeckFavorite
  useEffect(() => {
    if (dataFavorite && dataFavorite.data) {
      const isFavorite = dataFavorite.data.some((post) => post._id === postId);
      setIsCheckFavorite(isFavorite);
    }
  }, [dataFavorite, postId, isCheckFavorite]);
  console.log(isCheckFavorite, "isCheckFavorite");

  // console.log(userState?.userInfo?.token, "datafavorite");
  const { mutate: mutateCreateFavorite, isLoading: isLoadingCreateFavorite } =
    useMutation({
      mutationFn: ({ token, postId }) => {
        return createFavorite({
          token: userState?.userInfo?.token,
          postId,
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        refetch();
        ref();
        console.log("Đánh giá đã được tạo thành công", data);
        toast.success("Đánh giá đã được tạo thành công", data);
      },
    });
  const hanleFavorite = () => {
    mutateCreateFavorite({
      token: userState?.userInfo?.token,
      postId: postId,
    });
    refetch();
  };

  const {
    data: dataCountFavorite,
    isLoading: isLoadingCountFavorite,
    refetch: ref,
  } = useQuery({
    queryFn: () => getCountFavorite({ postId }),
    queryKey: ["countFavorite"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(dataCountFavorite, "dataCountFavorite");
  return (
    <div className="flex flex-col border-r px-5 py-3 gap-y-2 w-[48%] lg:w-auto">
      <p>Yêu Thích</p>
      <div className="flex gap-x-2 items-center">
        <button
          onClick={hanleFavorite}
          className={`outline-none border-none text-2xl ${
            isCheckFavorite ? "text-red-500" : ""
          }`}
        >
          <FaHeart />
        </button>

        {dataCountFavorite && <span>{dataCountFavorite.length}</span>}
      </div>
    </div>
  );
};
