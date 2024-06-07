import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { images, stable } from "../../../../constants";
import { deletePost, getAllPosts } from "../../../../services/index/posts";
import Pagination from "../../../../components/Pagination";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateCheckUser,
  updateProfile,
} from "../../../../services/index/users";
import { userActions } from "../../../../store/reducers/userReducers";

let isFlag = true;

const Users = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [check, setCheck] = useState(1);

  const {
    data: userData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllUsers({ email: searchKeyWord }),
    queryKey: ["users"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

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
  const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } =
    useMutation({
      mutationFn: ({ userId }) => {
        return deleteUser({
          userId: userId,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["users"]);
        toast.success("Tài khoản đã được Xóa");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleDeleteUser = ({ userId }) => {
    mutateDeleteUser({ userId });
  };

  const { mutate: mutateComfirm, isLoadingComfirm } = useMutation({
    mutationFn: ({ userId, check }) => {
      return updateCheckUser({
        userId,
        check,
      });
    },
    onSuccess: (data) => {
      toast.success("Xác nhận thành công");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <div className="container lg:px-4 mx-auto sm:px-8 h-[100vh]">
      {/* max-w-3xl */}
      <div className="py-8">
        <div className="flex lg:flex-row flex-col justify-between w-full mb-1 sm:mb-0">
          <h2 className="lg:text-2xl text-xl mb-3 lg:mb-0 leading-tight text-violet">
            Danh Sách Tài Khoản
          </h2>
          <div className="text-end">
            <form
              onSubmit={submitSearchKeyWord}
              className="flex flex-col justify-center  max-w-sm space-y-3 w-full md:flex-row md:w-full md:space-x-3 md:space-y-0"
            >
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Nhập email tìm kiếm"
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
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-white dark:bg-base-200 text-gray-800 dark:text-dark-light ">
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat lg:text-left uppercase border-b border-gray-200"
                  >
                    Tên
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left uppercase border-b border-gray-200 w-1/6"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left uppercase border-b border-gray-200 w-1/6"
                  >
                    Trang Thái
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left uppercase border-b border-gray-200 w-1/6"
                  >
                    Loại Tài Khoản
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left uppercase border-b border-gray-200 w-1/6"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 w-full">
                      Loading......
                    </td>
                  </tr>
                ) : userData?.length === 0 ? (
                  <td colSpan={5} className="text-center py-10 w-full">
                    Không có tài khoản nào được đăng ký
                  </td>
                ) : (
                  userData?.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white dark:bg-base-200 text-gray-900 dark:text-dark-light"
                    >
                      <td className="px-5 py-5 text-sm border-b border-gray-200 ">
                        <div className="flex items-center gap-x-2">
                          <div>
                            <img
                              className="mx-auto object-cover rounded-full h-10 w-10"
                              src={
                                item.avatar
                                  ? stable.UPLOAD_FOLDER_BASE_URL + item.avatar
                                  : images.UserLogo
                              }
                              alt=""
                            />
                          </div>
                          <div className="flex-shrink-0">
                            <span>{item.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 lg:text-sm text-[12px] text-nowrap border-b border-gray-200">
                        <p className=" whitespace-no-wrap">{item.email}</p>
                      </td>
                      <td className="px-5 py-5 text-sm border-b border-gray-200">
                        <p
                          className={`whitespace-no-wrap text-nowrap font-semibold  ${
                            item.admin
                              ? "text-orange-500"
                              : item.check === 1
                              ? "text-blue-600"
                              : item.check === 2
                              ? "text-green-500"
                              : item.check === 0
                              ? "text-violet"
                              : "text-transparent"
                          }`}
                        >
                          {item.admin
                            ? "Sếp"
                            : item.check === 1
                            ? "Chờ xác nhận"
                            : item.check === 2
                            ? "Thuyết Giả"
                            : item.check === 0
                            ? "Đọc Lỗi"
                            : "Lỗi"}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm border-b border-gray-200">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight ">
                          {/* <span
                            aria-hidden="true"
                            className="absolute inset-0rounded-full opacity-50"
                          ></span> */}
                          <span
                            className={`relative text-nowrap ${
                              item.admin ? "text-red-500" : "text-blue-500"
                            }`}
                          >
                            {item.admin ? "Quản Lý" : "Người Dùng"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 text-sm font-bold border-b border-gray-200 space-x-5">
                        <div className="flex items-center gap-3 font-bold">
                          {" "}
                          {!item.admin && (
                            <div className="bg-red-500 text-white px-3 py-2 rounded-lg bg-opacity-100">
                              <button
                                disabled={isLoadingDeleteUser}
                                type="button"
                                className="hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed "
                                onClick={() =>
                                  handleDeleteUser({
                                    userId: item?._id,
                                  })
                                }
                              >
                                Xoá
                              </button>
                            </div>
                          )}
                          {item.admin || item.check === 0 ? (
                            ""
                          ) : item.check === 2 ? (
                            <button
                              disabled={isLoadingDeleteUser}
                              type="button"
                              className="text-purple-500 hover:text-green-900 disabled:opacity-70 disabled:cursor-not-allowed "
                              onClick={() =>
                                mutateComfirm({
                                  userId: item._id,
                                  check: 0,
                                })
                              }
                            >
                              Ra Đảo
                            </button>
                          ) : (
                            <button
                              disabled={isLoadingDeleteUser}
                              type="button"
                              className="text-green-600 hover:text-green-900 disabled:opacity-70 disabled:cursor-not-allowed text-nowrap "
                              onClick={() =>
                                mutateComfirm({
                                  userId: item._id,
                                  check: 2,
                                })
                              }
                            >
                              Xác nhận
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
