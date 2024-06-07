import React from "react";
import { getFavoriteByUser } from "../../../services/index/favorite";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import MainAllArcticle from "../../allArcticle/container/MainAllArcticle";

export const Favorite = () => {
  const userState = useSelector((state) => state.user);
  const userId = userState?.userInfo?._id;
  const {
    data: dataFavorite,
    isLoading: isLoadingGetFavorite,
    refetch,
  } = useQuery({
    queryFn: () => getFavoriteByUser({ userId }),
    queryKey: ["favorites"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(dataFavorite, "dataFavorite");
  return (
    <div className="border-r-indigo-700 lg:border-r-4">
      {dataFavorite?.data.length > 0 ? (
        <div className="lg:w-3/4 w-auto">
          <h2 className="font-bold text-lg mb-4">Các bài viết yêu thích</h2>
          <MainAllArcticle
            postsData={dataFavorite}
            dataUserPost={dataFavorite.user}
          />
          {/* <Pagination
            onPageChange={(page) => setCurrentPage(page)}
            currentPage={currentPage}
            totalPageCount={JSON.parse(
              postsData?.headers?.["x-totalpagecount"]
            )}
          /> */}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center h-[50vh] w-3/4">
          <p className="text-red-500 text-2xl">
            Không tìm thấy bài viết phù hợp
          </p>
        </div>
      )}
    </div>
  );
};
