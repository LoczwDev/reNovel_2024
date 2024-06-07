import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { images, stable } from "../../../../constants";
import {
  checkPost,
  createPost,
  deletePost,
  getAllPosts,
} from "../../../../services/index/posts";
import Pagination from "../../../../components/Pagination";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

let isFlag = true;

const PostManage = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postIds, setPostIds] = useState([]);
  const [isCheckDisplay, setIsCheckDisplay] = useState(false);
  // const [checked, setChecked] = useState(false);
  const {
    data: postsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () =>
      getAllPosts({
        searchKeyWord: searchKeyWord,
        page: currentPage,
        limit: 5,
      }),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(postsData, "postsData");

  useEffect(() => {
    if (isFlag) {
      isFlag = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeyWordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyWord(value);
  };
  const submitSearchKeyWord = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  // Delete
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
        refetch();
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

  // update Check
  const { mutate: mutateUpdateCheck, isLoading: isLoadingUpdateCheck } =
    useMutation({
      mutationFn: ({ postIds }) => {
        return checkPost({
          postIds: postIds,
        });
      },
      onSuccess: (data) => {
        toast.success("Post đã được Cap nhat");
        navigate("/admin/posts/manage");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setPostIds([...postIds, value]);

    setIsCheckDisplay(true);
  };

  const handleUpdate = () => {
    mutateUpdateCheck({
      postIds: postIds,
    });
    refetch();
  };

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
        navigate(`/admin/posts/manage/edit/${data?.slug}`);
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
    <div className="container lg:px-4 mx-auto sm:px-8 max-h-screen">
      {/* max-w-3xl */}
      <div className="py-8">
        <div className="flex lg:flex-row flex-col justify-between w-full mb-1 sm:mb-0">
          <h2 className="lg:text-2xl text-xl mb-3 lg:mb-0 leading-tight text-violet">
            Danh Sách Bài Đăng
          </h2>
          <div className="overflow-hidden">
            <div
              className={`w-full flex justify-end transition-transform duration-500 transform ${
                isCheckDisplay ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <button
                onClick={handleUpdate}
                className="focus:outline-none text-nowrap text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Cập nhật
              </button>
            </div>
          </div>
          <div className=" flex text-center justify-between gap-x-3">
            <form
              onSubmit={submitSearchKeyWord}
              className="flex flex-col justify-center lg:w-3/4 max-w-sm space-y-3 w-full md:flex-row md:w-full md:space-x-3 md:space-y-0"
            >
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Nhập tên bài đăng..."
                  onChange={searchKeyWordHandler}
                  value={searchKeyWord}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Tìm Kiếm
              </button>
            </form>
            <button
              disabled={isLoadingCreatePost}
              className="text-gray-900 w-28 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() =>
                handlerCreateNewPost({
                  token: userState.userInfo.token,
                })
              }
            >
              THÊM BÀI
            </button>
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat lg:text-left text-gray-800 dark:text-dark-light uppercase bg-white border-b border-gray-200 dark:bg-base-200"
                  ></th>
                  <th
                    scope="col"
                    className="text-nowrap lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat lg:text-left text-gray-800 dark:text-dark-light uppercase bg-white border-b border-gray-200 dark:bg-base-200"
                  >
                    Bài đăng
                  </th>
                  <th
                    scope="col"
                    className="text-nowrap lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 dark:text-dark-light uppercase bg-white border-b border-gray-200 w-1/6 dark:bg-base-200"
                  >
                    Người đăng
                  </th>
                  <th
                    scope="col"
                    className="text-nowrap  lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 dark:text-dark-light uppercase bg-white border-b border-gray-200 w-1/6 dark:bg-base-200"
                  >
                    Ngày Cập nhật
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 dark:text-dark-light uppercase bg-white border-b border-gray-200 w-1/6 dark:bg-base-200"
                  >
                    Tag
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 dark:text-dark-light uppercase bg-white border-b border-gray-200 w-1/6 dark:bg-base-200"
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
                ) : postsData?.data?.length === 0 ? (
                  <td colSpan={5} className="text-center py-10 w-full">
                    Không có bài viết nào
                  </td>
                ) : (
                  postsData?.data.map((item) => (
                    <tr
                      key={item._id}
                      className="dark:text-dark-light text-gray-900"
                    >
                      <td className="px-5 py-5 lg:text-sm text-[12px] text-nowrap bg-white border-b border-gray-200 dark:bg-base-200">
                        <div className="relative flex items-center p-3 rounded-full cursor-pointer">
                          <input
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                            type="checkbox"
                            defaultChecked={item.checked}
                            value={item._id}
                            onChange={handleCheckboxChange}
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
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
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-base-200 ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                              <img
                                alt={item.title}
                                src={
                                  item?.photo
                                    ? stable.UPLOAD_FOLDER_BASE_URL +
                                      item?.photo
                                    : images.Origin
                                }
                                className="mx-auto object-cover rounded-lg border-violet border h-10 w-10"
                              />
                            </a>
                          </div>
                          <div className="ml-3 w-full truncate">
                            <p className="whitespace-no-wrap text-base italic hidden lg:block">
                              {item?.title.length > 30
                                ? `${item?.title.substring(0, 30)}...`
                                : item?.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 lg:text-sm text-[12px] text-nowrap bg-white border-b border-gray-200 dark:bg-base-200">
                        <p className="whitespace-no-wrap">{item?.user?.name}</p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-nowrap dark:bg-base-200">
                        <p className="whitespace-no-wrap">
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
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-base-200">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-violet">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-violet rounded-full opacity-30"
                          ></span>
                          <span className="relative text-nowrap">{item.tags?.title}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-base-200">
                        <div className="flex justify-center items-center gap-x-3 font-bold">
                          <div className="bg-red-500 px-3 py-2 rounded-lg bg-opacity-100">
                            <button
                              disabled={isLoadingDeletePost}
                              type="button"
                              className="text-white hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed "
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
                            to={`/admin/posts/manage/edit/${item?.slug}`}
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
            {!isLoading && (
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                totalPageCount={JSON.parse(
                  postsData?.headers?.["x-totalpagecount"]
                )}
              />
            )}
          </div>
          {/* {isCheckDisplay && ( */}
        </div>
      </div>
    </div>
  );
};

export default PostManage;
