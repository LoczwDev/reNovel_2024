import React, { useState } from "react";
import { getAllCategory } from "../../../../services/index/postCategory";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DataTable } from "../../components/DataTable";

export const CategoryPost = () => {
  const { data: categoryData, refetch } = useQuery({
    queryFn: () => getAllCategory(),
    queryKey: ["categories"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <div className="max-w-full h-lvh">
      <DataTable categoryData={categoryData} refetch={refetch} />
    </div>
  );
};
