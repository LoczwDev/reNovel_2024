import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { createPost } from "../../../services/index/posts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TablePostUser } from "./TablePostUser";
// import { TestCreate } from "./testCreate";

export const PostManagerUser = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return createPost({
          token: token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post đã được tạo vui long chinh sua");
        console.log(data);
        navigate(`/posts/manage/edit/${data?.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handlerCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };
  return (
    <div>
      {userState.userInfo?.check == 1 || userState.userInfo?.check === 0 ? (
        <p className="text-red-500 text-xl">Bạn không có quyền đăng bài</p>
      ) : userState.userInfo?.admin ? (
        <p className="text-green-500 text-xl">Qua Đây Chi??????????</p>
      ) : (
        <div className="flex items-center justify-between">
          <button
            disabled={isLoadingCreatePost}
            className="text-start disabled:cursor-not-allowed disabled:opacity-50 border border-purple-400 rounded-lg px-2 py-3 hover:bg-purple-600"
            onClick={() =>
              handlerCreateNewPost({
                token: userState.userInfo?.token,
              })
            }
          >
            Thêm bài đăng mới
          </button>
          <p>{userState.userInfo.points}</p>
        </div>
      )}{" "}
      {/* <TestCreate /> */}
      {userState.userInfo?.check === 2 && <TablePostUser />}
    </div>
  );
};
