import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { createCategory } from "../../../../../services/index/postCategory";
import toast from "react-hot-toast";

export const ButtonCreate = ({ refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ title }) => {
        return createCategory({
          title: title,
        });
      },
      onSuccess: () => {
        toast.success("Đã tạo category thành công");
        setNewCategory("");
        refetch();
        setShowModal(false);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Thêm thể loại sách
      </button>
      {showModal ? (
        <>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className={`${
                  showModal
                    ? "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none opacity-100 transition-opacity duration-300 ease-in-out  transform"
                    : "opacity-0 transition-opacity duration-300 ease-in-out  transform"
                } `}
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Thêm thể loại</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className=" w-full">
                    <input
                      type="text"
                      placeholder="Nhập tên category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="border-violet px-2 py-3 w-full rounded-lg mb-5 border"
                    />
                    <button
                      className="w-full px-3 py-3 border-violet bg-violet text-white border-4 font-bold rounded-lg duration-200"
                      onClick={() =>
                        mutateCreateCategory({ title: newCategory })
                      }
                      disabled={isLoadingCreateCategory}
                    >
                      {isLoadingCreateCategory ? "Đang tạo..." : "Tạo"}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
