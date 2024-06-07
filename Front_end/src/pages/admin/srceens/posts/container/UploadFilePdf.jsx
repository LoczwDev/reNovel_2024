// UploadFileComponent.jsx
import React, { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFilePDF,
  getfilePdf,
} from "../../../../../services/index/libraryPdf";
import toast from "react-hot-toast";
import { stable } from "../../../../../constants";
import { Link } from "react-router-dom";

const UploadFilePdf = ({ postId, token }) => {
  const [filePdf, setFilePdf] = useState(null);
  const [checkUploadPdf, setCheckUploadPdf] = useState(false);
  const {
    data: dataFpdf,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getfilePdf({ postId: postId }),
    queryKey: ["filePdf"],
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(dataFpdf, "yyy");

  const handleFileChange = (e) => {
    setFilePdf(e.target.files[0]);
  };
  const { mutate } = useMutation({
    mutationFn: ({ postId, formData, token }) => {
      return createFilePDF({
        postId,
        formData,
        token,
      });
    },
    onSuccess: (data) => {
      alert("Upload file thành công");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpload = async () => {
    try {
      if (!filePdf) {
        alert("Bạn chưa chọn file");
        return;
      }

      const formData = new FormData();
      formData.append("pdf", filePdf);
      mutate({ postId: postId, formData: formData, token: token });
    } catch (error) {
      console.error("Lỗi khi upload file:", error);
      alert("Lỗi khi upload file");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <label className="text-lg font-semibold flex items-center gap-x-3">
        <p>File ăn tiền: </p>
        {dataFpdf?.pdf ? (
          <div>
            <a
              className="text-green-500"
              href={stable.UPLOAD_FOLDERPDF_BASE_URL + dataFpdf?.pdf}
              target="_blank"
            >
              Xem
            </a>
          </div>
        ):(<p className="text-red-400 font-semibold text-lg">Chưa có file dịch cho đánh giá này</p>)}
      </label>
      {!checkUploadPdf && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setCheckUploadPdf(true)}
        >
          Thay đổi
        </button>
      )}
      {checkUploadPdf && (
        <>
          {" "}
          <label className="text-lg font-semibold">
            <input
              onChange={handleFileChange}
              type="file"
              className="text-sm text-grey-500 ml-4
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
            />
          </label>
          <button
            className="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            onClick={handleUpload}
          >
            Upload
          </button>
        </>
      )}
    </div>
  );
};

export default UploadFilePdf;
