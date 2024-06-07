import React from "react";
import { useSelector } from "react-redux";
import { deletePost, getPostUser } from "../../../services/index/posts";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { images, stable } from "../../../constants";
import { Link } from "react-router-dom";

export const TablePostUser = () => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const userId = userState?.userInfo?._id;
  const {
    data: dataPostUser,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getPostUser({ userId }),
    queryKey: ["postUser"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(dataPostUser, "dataPostUsertttttttttttt");
  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return deletePost({
          slug: slug,
          token: token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post đã được Xóa");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const deletePostHandler = ({ slug, token }) => {
    mutateDeletePost({ slug, token });
  };
  return (
    <table className="min-w-full leading-normal mt-3">
      <thead>
        <tr>
          <th
            scope="col"
            className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat lg:text-left text-gray-800 uppercase bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light"
          >
            Bài đăng
          </th>
          <th
            scope="col"
            className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 uppercase bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light w-1/6"
          >
            Ngày Cập nhật
          </th>
          <th
            scope="col"
            className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 uppercase bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light w-1/6"
          >
            Tags
          </th>
          <th
            scope="col"
            className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 uppercase bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light w-1/6"
          >
            Trạng thái
          </th>
          <th
            scope="col"
            className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 uppercase bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light w-1/6"
          ></th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={5} className="text-center py-10 w-full">
              Loading......
            </td>
          </tr>
        ) : dataPostUser?.length === 0 ? (
          <td colSpan={5} className="text-center py-10 w-full">
            Không có bài viết nào
          </td>
        ) : (
          dataPostUser?.map((item) => (
            <tr key={item._id}>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* <Link to={`/blog/${item.slug}`}> */}
                    <Link
                      to={`/blog/${item.slug}`}
                      href="#"
                      className="relative block"
                    >
                      <img
                        alt={item.title}
                        src={
                          item?.photo
                            ? stable.UPLOAD_FOLDER_BASE_URL + item?.photo
                            : images.Yae
                        }
                        className="mx-auto object-cover rounded-full h-10 w-10"
                      />
                    </Link>
                    {/* </Link> */}
                  </div>
                  <div className="ml-3 w-full truncate">
                    <Link to={`/blog/${item.slug}`}>
                      <p className="text-gray-900 dark:text-dark-light whitespace-no-wrap text-base italic hidden lg:block">
                        {item?.title.length > 30
                          ? `${item?.title.substring(0, 30)}...`
                          : item?.title}
                      </p>
                    </Link>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light">
                <p className="text-gray-900 dark:text-dark-light whitespace-no-wrap">
                  {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light">
                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                  ></span>
                  <span className="relative">{item.tags?.title}</span>
                </span>
              </td>
              <td className="px-5 py-5 lg:text-sm text-[12px] text-nowrap bg-white border-b border-gray-200 dark:bg-base-100 dark:text-dark-light">
                <p
                  className={` whitespace-no-wrap font-bold ${
                    item?.checked ? "text-green-500" : "text-blue-500"
                  }`}
                >
                  {item?.checked ? "Đã Duyệt" : "Chưa Duyệt"}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5 dark:bg-base-100 dark:text-dark-light">
                <div className="flex items-center justify-center gap-x-2">
                  <div className="bg-red-500 px-3 py-2 rounded-lg">
                    <button
                      disabled={isLoadingDeletePost}
                      type="button"
                      className="text-white font-bold hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed "
                      onClick={() =>
                        deletePostHandler({
                          slug: item?.slug,
                          token: userState.userInfo.token,
                        })
                      }
                    >
                      Xoá
                    </button>
                  </div>

                  <Link
                    to={`/posts/manage/edit/${item?.slug}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
