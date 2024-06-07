import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  checkComments,
  deleteComment,
  getAllComments,
} from "../../../../services/index/comment";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { stable } from "../../../../constants";

export const CommentsMannager = () => {
  const userState = useSelector((state) => state.user);
  const [isCheckDisplay, setIsCheckDisplay] = useState(false);
  // const [commentIds, setCommentIds] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const {
    data: commentsData,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getAllComments({ valueSearch: valueSearch }),
    queryKey: ["comments"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const searchKeyWordHandler = (e) => {
    const { value } = e.target;
    setValueSearch(value);
  };
  const submitSearchKeyWord = (e) => {
    e.preventDefault();
    refetch();
  };

  //     DeleteComment
  const { mutate: mutateDeleteComment, isLoading: isLoadingDeleteComment } =
    useMutation({
      mutationFn: ({ token, commentId }) => {
        return deleteComment({
          token,
          commentId,
        });
      },
      onSuccess: (data) => {
        refetch();
        toast.success("Xóa Thành Công");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  // const handleCheckboxChange = (e) => {
  //   const { value, checked } = e.target;
  //   setCommentIds([...commentIds, value]);

  //   setIsCheckDisplay(true);
  // };

  // const handleUpdate = () => {
  //   mutateUpdateCheck({
  //     commentIds: commentIds,
  //   });
  //   refetch();
  //   //     window.location.reload();
  // };

  //   useEffect(() => {}, [refetch, isCheckDisplay, commentIds, valueSearch]);
  return (
    <div className="container lg:px-4 mx-auto sm:px-8 h-[100vh]">
      <div className="py-8">
        <div className="flex lg:flex-row flex-col justify-between w-full mb-1 sm:mb-0">
          <h2 className="lg:text-2xl text-xl mb-3 lg:mb-0 leading-tight text-violet">
            Danh Sách Comments
          </h2>
          <div className="text-end">
            <form
              onSubmit={submitSearchKeyWord}
              className="flex flex-col justify-center lg:w-full max-w-sm space-y-3 w-full md:flex-row md:w-full md:space-x-3 md:space-y-0"
            >
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="placeholder:text-sm rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white  text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Nhập nội dung bình luận..."
                  onChange={searchKeyWordHandler}
                  value={valueSearch}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Tìm Kiếm
              </button>
            </form>
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="dark:bg-base-200 bg-white text-gray-800  dark:text-dark-light">
                  {/* <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat lg:text-left  uppercase  border-b border-gray-200"
                  >
                    Check
                  </th> */}
                  <th
                    scope="col"
                    className="text-nowrap lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat lg:text-left  uppercase  border-b border-gray-200"
                  >
                    Bài Đăng
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left  uppercase  border-b border-gray-200 w-1/6"
                  >
                    Người Dùng
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left  uppercase  border-b border-gray-200 w-1/6"
                  >
                    Thời Gian
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left  uppercase  border-b border-gray-200 w-1/6"
                  >
                    Nội Dung
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left  uppercase  border-b border-gray-200 w-1/6"
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
                ) : commentsData?.length === 0 ? (
                  <td colSpan={5} className="text-center py-10 w-full">
                    Không có nào tồn tại
                  </td>
                ) : (
                  commentsData?.map((item) => (
                    <tr
                      key={item._id}
                      className="dark:bg-base-200 bg-white text-gray-900 dark:text-dark-light"
                    >
                      {/* <td className="px-5 py-5 lg:text-sm text-[12px] text-nowrap  border-b border-gray-200 ">
                        <div className="relative flex items-center p-3 rounded-full cursor-pointer">
                          <input
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                            type="checkbox"
                            defaultChecked={item.check}
                            value={item._id}
                            onChange={handleCheckboxChange}
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-[49%] -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </td> */}
                      <td className="px-5 py-5 text-sm  border-b border-gray-200 ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                              <img
                                alt={item?.post?.title}
                                src={
                                  item?.post?.photo
                                    ? stable.UPLOAD_FOLDER_BASE_URL +
                                      item?.post?.photo
                                    : images.Origin
                                }
                                className="mx-auto object-cover rounded-full h-10 w-10"
                              />
                            </a>
                          </div>
                          <div className="ml-3 w-full truncate">
                            <p className=" whitespace-no-wrap text-base italic hidden lg:block">
                              {item?.post?.title > 30
                                ? `${item?.post?.photo.substring(0, 30)}...`
                                : item?.post?.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 lg:text-sm text-[12px] text-nowrap  border-b border-gray-200">
                        <p className=" whitespace-no-wrap">{item.user.name}</p>
                      </td>
                      <td className="px-5 py-5 text-sm  border-b border-gray-200 text-nowrap">
                        <p className={`whitespace-no-wrap font-semibold`}>
                          {new Date(item.createdAt).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm  border-b border-gray-200">
                        <span className="relative inline-block px-3 py-1 font-semibold w-70px text-wrap">
                          {item.desc}
                        </span>
                      </td>
                      <td className="px-5 py-5 text-sm font-bold  border-b border-gray-200 space-x-5">
                        <div className="flex items-center justify-center">
                          <div className="bg-red-500 text-white px-3 py-2 rounded-lg bg-opacity-100 font-bold">
                            <button
                              disabled={isLoadingDeleteComment}
                              type="button"
                              className="hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed "
                              onClick={() =>
                                mutateDeleteComment({
                                  token: userState?.userInfo?.token,
                                  commentId: item?._id,
                                })
                              }
                            >
                              Xoá
                            </button>
                          </div>
                        </div>

                        {/* <button
                          //      disabled={isLoadingDeleteUser}
                          type="button"
                          className="text-purple-500 hover:text-green-900 disabled:opacity-70 disabled:cursor-not-allowed "
                          //      onClick={() =>
                          //        mutateComfirm({
                          //          userId: item._id,
                          //          check: 0,
                          //        })
                          //      }
                        >
                          Ra Đảo
                        </button> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* <div className="overflow-hidden">
            <div
              className={`w-full flex justify-end transition-transform duration-500 transform ${
                isCheckDisplay ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <button
                onClick={handleUpdate}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Cập nhật
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
