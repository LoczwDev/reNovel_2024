import { useMutation } from "@tanstack/react-query";
import React from "react";
import { deleteCategory } from "../../../services/index/postCategory";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ButtonCreate } from "../srceens/categoryPost/container/ButtonCreate";

export const DataTable = ({ categoryData, refetch }) => {
  console.log(categoryData, "testtttttttttt");
  const { mutate: mutateDeleteCategory, isLoading: isLoadingDeleteCategory } =
    useMutation({
      mutationFn: ({ categoryId }) => {
        return deleteCategory({
          categoryId: categoryId,
        });
      },
      onSuccess: (data) => {
        toast.success("Category đã được Xóa");
        refetch();
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  return (
    <div className="container lg:px-4 mx-auto w-full">
      {/* max-w-3xl */}
      <div className="py-8">
        <div className="flex lg:flex-row flex-col justify-between w-full mb-1 sm:mb-0">
          <h2 className="lg:text-2xl text-xl mb-3 lg:mb-0 leading-tight text-violet">
            Danh Sách Category
          </h2>
          <ButtonCreate refetch={refetch} />
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal table-auto">
              <thead>
                <tr className="dark:text-dark-light dark:bg-base-200 text-gray-800 bg-white">
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat lg:text-left uppercase border-b border-gray-200"
                  >
                    Tên Thể Loại
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left uppercase border-b border-gray-200 "
                  >
                    Thời Gian Tạo
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left uppercase border-b border-gray-200"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {isLoadingDeleteCategory ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 w-full">
                      Loading......
                    </td>
                  </tr>
                ) : categoryData?.data.length === 0 ? (
                  <td colSpan={5} className="text-center py-10 w-full">
                    Không Có Thể Loại Nào Được Tạo
                  </td>
                ) : (
                  categoryData?.data?.map((item) => (
                    <tr
                      key={item._id}
                      className="text-gray-900 dark:text-dark-light bg-white dark:bg-base-200 "
                    >
                      <td className="px-5 py-5 text-sm border-b border-gray-200 ">
                        <div className="truncate">
                          <p>{item.title}</p>
                        </div>
                      </td>
                      <td className="px-5 py-5 lg:text-sm text-[12px] text-nowrap border-b border-gray-200">
                        <p className=" whitespace-no-wrap">
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
                      <td className="px-5 py-5 flex items-center text-sm  justify-center border-b border-gray-200">
                        <div className="items-center justify-center flex gap-x-2">
                          <div className="bg-red-500 text-white font-bold px-3 py-2 rounded-lg bg-opacity-100">
                            <button
                              disabled={isLoadingDeleteCategory}
                              type="button"
                              className="hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed "
                              onClick={() =>
                                mutateDeleteCategory({ categoryId: item?._id })
                              }
                            >
                              Xoá
                            </button>
                          </div>
                          <Link
                            to={`/admin/category/edit/${item._id}`}
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
            {/* {!isLoading && (
               <Pagination
                 onPageChange={(page) => setCurrentPage(page)}
                 currentPage={currentPage}
                 // totalPageCount={JSON.parse(
                 //   postsData?.headers?.["x-totalpagecount"]
                 // )}
               />
             )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
