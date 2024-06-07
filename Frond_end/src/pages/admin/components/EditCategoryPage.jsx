import React, { useState } from "react";
import {
  getDetailCategory,
  updateCategory,
} from "../../../services/index/postCategory";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const EditCategoryPage = () => {
  const navigate = useNavigate();
  const [valueTitle, setValueTitle] = useState("");
  const { categoryId } = useParams();
  console.log(categoryId, "categoryId");

  const { data: categoryData, refetch } = useQuery({
    queryFn: () => getDetailCategory({ categoryId }),
    queryKey: ["categories", categoryId],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    mutate: mutateUpdateCategory,
    isLoading: isLoadingUpdatecategoryCategory,
  } = useMutation({
    mutationFn: ({ categoryId, title }) => {
      return updateCategory({
        categoryId,
        title,
      });
    },
    onSuccess: (data) => {
      toast.success("Category đã được cập nhật");
      navigate("/admin/categorypost"); // Chuyển hướng đến trang "/admin/categorypost"
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(categoryData, "categoryData");
  return (
    <div className="w-full h-screen">
      <input
        type="text"
        defaultValue={
          categoryData && categoryData.data && categoryData.data.title
            ? categoryData.data.title
            : ""
        }
        onChange={(e) => setValueTitle(e.target.value)}
        className="w-full outline-none rounded-lg border border-purple-400 px-2 py-3"
      />
      <button
        onClick={() =>
          mutateUpdateCategory({ categoryId: categoryId, title: valueTitle })
        }
        className="outline-none border border-violet hover:bg-violet hover:bg-opacity-20 px-3 py-2 rounded-xl mt-5"
      >
        Cập Nhật
      </button>
    </div>
  );
};
