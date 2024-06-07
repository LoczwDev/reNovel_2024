import React, { useEffect, useState } from "react";
import { getDetailsPost, updatePost } from "../../../../services/index/posts";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import parseJson from "../../../../utils/parseJSON";
import { images, stable } from "../../../../constants";
import { AiOutlineCamera } from "react-icons/ai";
import { LoadingDetails } from "../../../articleDetail/container/LoadingDetails";
import Editor from "../../../../components/editor/Editor";
import { SelectMultiple } from "../../components/selectmuti/SelectMultiple";
import { getAllCategory } from "../../../../services/index/postCategory";
import {
  categoryOption,
  filterCategory,
} from "../../../../utils/selectMultiTag";
import { getAllTags } from "../../../../services/index/tags";
import UploadFilePdf from "./container/UploadFilePdf";

const promiseOptions = async (inputValue) => {
  const { data: categoryData } = await getAllCategory();
  // console.log(categoryData, "categoryData");
  return filterCategory(inputValue, categoryData);
};

const dataPostStatus = [
  {
    title: "Đang Ra Mắt",
    id: "statusLoading",
  },
  {
    title: "Đã Hoàn Thành",
    id: "statusComplete",
  },
  {
    title: "Chưa Ra Mắt",
    id: "statusComing",
  },
];
const dataCountry = [
  {
    title: "Nhật Bản",
    id: "NB",
  },
  {
    title: "Trung Quốc",
    id: "TQ",
  },
  {
    title: "Hàn Quốc",
    id: "HQ",
  },
  {
    title: "Việt Nam",
    id: "VN",
  },
];

export const EditPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState(null);

  const [statusPhoto, setStatusPhoto] = useState(null);

  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [tags, setTags] = useState("");

  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getDetailsPost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setStatusPhoto(data?.photo);
      setCategory(data?.category.map((item) => item.value));
      setTitle(data.title);
      setCaption(data.caption);
      setCountry(data.country);
      setStatus(data.status);
      setTags(data?.tags);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { data: dataTags } = useQuery({
    queryFn: () => getAllTags(),
    queryKey: ["tags"],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updateData, slug, token }) => {
      return updatePost({
        updateData,
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Đã Lưu Bài Đánh Giá");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setStatusPhoto(data?.photo);
      setCategory(data?.category.map((item) => item._id));
      setTitle(data.title);
      setCaption(data.caption);
      setCountry(data?.country);
      setStatus(data?.status);
      setTags(data?.tags?._id);
      setBody(data?.body);
    }
  }, [isError, isLoading]);

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handlerUpdatePost = async () => {
    if (
      !status ||
      category.length === 0 ||
      !title ||
      !caption ||
      !country ||
      !tags
    ) {
      // Hiển thị thông báo lỗi
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    } else if (body.length < 1500) {
      toast.error("Nội dung đánh giá phải hơn 500 từ");
      return;
    }

    let updateData = new FormData();

    if (!statusPhoto && photo) {
      updateData.append("postImg", photo);
    } else if (statusPhoto && !photo) {
      const urlObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], statusPhoto, { type: blob.type });
        return file;
      };

      const photoImg = await urlObject(
        stable.UPLOAD_FOLDER_BASE_URL + data?.photo
      );
      updateData.append("postImg", photoImg);
    }
    updateData.append(
      "document",
      JSON.stringify({ body, category, title, caption, country, status, tags })
    );

    mutateUpdatePostDetail({
      updateData,
      slug,
      token: userState.userInfo.token,
    });
    setTimeout(() => {
      const currentPath = window.location.pathname;
      if (currentPath.includes("admin")) {
        navigate("/admin/posts/manage");
      } else {
        navigate("/");
      }
    }, 1000);
  };

  const handlerDeletePhoto = () => {
    if (window.confirm("Ban co muon xoa anh nay khong")) {
      setStatusPhoto(null);
      setPhoto(null);
    }
  };

  return (
    <div className="container mx-auto h-auto">
      {isLoading ? (
        <LoadingDetails />
      ) : isError ? (
        <ErroMessage message="Không tìm thấy dữ liệu" />
      ) : (
        <>
          <section className=" flex-col px-5 py-5 lg:flex lg:flex-row lg:gap-x-5 lg:items-start border border-primary rounded-lg ">
            <article className="flex-1">
              {data && (
                <>
                  <div className="flex gap-x-2 justify-between">
                    <div className="w-1/2 border-r p-4">
                      <div className="mt-2 flex flex-row items-center justify-between w-full">
                        <label
                          htmlFor="postTitleInput"
                          className="font-semibold text-lg text-nowrap font-opensans"
                        >
                          Tên Tiêu Đề:{" "}
                        </label>
                        <input
                          id="postTitleInput"
                          placeholder={data.title}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="px-4 bg-transparent py-2 w-full border-0 border-b-2 border-slate-300 focus:border-violet outline-none text-lg font-montserrat text-dark-hard dark:bg-base-100 dark:text-dark-light"
                        />
                      </div>

                      <div className="mt-2 flex flex-row items-center justify-between w-full">
                        {!isLoading && !isError && (
                          <>
                            <label
                              htmlFor="postTitleInput"
                              className="font-semibold text-lg text-nowrap font-opensans"
                            >
                              Chọn thể loại:{" "}
                            </label>
                            <SelectMultiple
                              loadOptions={promiseOptions}
                              defaultValue={data?.category.map(categoryOption)}
                              onchange={(newValue) =>
                                setCategory(newValue.map((item) => item.value))
                              }
                            />
                          </>
                        )}
                      </div>
                      <div className="mt-2 flex flex-row items-center justify-between w-full">
                        <label
                          htmlFor="countrySelect"
                          className="font-semibold text-lg text-nowrap font-opensans"
                        >
                          Quốc gia:{" "}
                        </label>
                        <select
                          id="countrySelect"
                          value={country}
                          onChange={(event) => setCountry(event.target.value)}
                          className="bg-transparent px-4 w-full py-2 border-0 border-b-2 border-slate-300 focus:border-violet outline-none text-lg font-montserrat text-dark-hard dark:bg-base-100 dark:text-dark-light"
                        >
                          <option value="">Chọn quốc gia</option>
                          {dataCountry.map((item) => (
                            <option key={item.id} value={item.title}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* PhoTo Post */}
                      <div className="my-3">
                        <p className="font-semibold text-lg text-nowrap font-opensans mb-2">
                          Chọn ảnh bài đăng:
                        </p>

                        <div
                          className={`rounded-lg outline-offset-2 outline-1 outline-primary  ${
                            photo || statusPhoto
                              ? "h-64 w-full flex item-center gap-x-3 sticky"
                              : "relative"
                          }`}
                        >
                          <label
                            htmlFor="postInputPhoto"
                            className=" cursor-pointer inset-0 rounded-full bg-transparent w-full h-[100px]"
                          >
                            {photo ? (
                              <div className="w-full rounded-xl border flex justify-center  border-violet">
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={data?.title}
                                  className="w-64 object-cover "
                                />
                              </div>
                            ) : statusPhoto ? (
                              <div className=" w-full rounded-xl border flex justify-center border-violet">
                                <img
                                  src={`${stable.UPLOAD_FOLDER_BASE_URL}${data?.photo}`}
                                  alt={data?.title}
                                  className="w-64 object-cover "
                                />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center w-full">
                                <label
                                  htmlFor="postInputPhoto"
                                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click Chọn Ảnh
                                      </span>{" "}
                                      Hoặc Kéo Thả
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      PNG, JPG, JPEG
                                    </p>
                                  </div>
                                  <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            )}
                          </label>
                          {photo || statusPhoto ? (
                            <div className="">
                  
                              <button
                                onClick={handlerDeletePhoto}
                                className="border border-red-500 rounded-lg py-2 text-lg px-4 bg-red-500 bg-opacity-20 duration-200 text-red-500 font-bold hover:bg-transparent hover:text- "
                              >
                                Xóa Ảnh
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                          <input
                            type="file"
                            className="sr-only"
                            id="postInputPhoto"
                            onChange={changeFileHandler}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2 p-1">
                      <div className="form-control w-full mt-4 gap-x-3">
                        <label
                          htmlFor="idPostCaption"
                          className="font-semibold text-lg text-nowrap font-opensans"
                        >
                          Giới Thiệu Tác Phẩm:{" "}
                        </label>
                        <textarea
                          cols="90"
                          rows="10"
                          id="idPostCaption"
                          placeholder={data.caption}
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          className="dark:bg-base-100 bg-transparent dark:text-dark-light resize-none px-4 py-2 rounded-lg border border-slate-300 focus:border-violet outline-none text-lg font-opensans text-dark-hard"
                        ></textarea>
                      </div>
                      <div className="mt-10 flex flex-row items-center w-full">
                        <label
                          htmlFor="tagsSelect"
                          className="font-semibold text-lg font-opensans"
                        >
                          Tags:{" "}
                        </label>
                        <select
                          id="tagsSelect"
                          value={tags}
                          onChange={(event) => setTags(event.target.value)}
                          className="bg-transparent dark:bg-base-100 dark:text-dark-light px-4 py-2 border-0 border-b-2 border-slate-300 focus:border-violet outline-none text-lg font-montserrat text-dark-hard"
                        >
                          <option value="">Chọn Tags</option>
                          {dataTags.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-10 flex flex-row items-center w-full">
                        <label
                          htmlFor="statusSelect"
                          className="font-semibold text-lg font-opensans text-nowrap"
                        >
                          Trạng thái:{" "}
                        </label>
                        <select
                          id="statusSelect"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="bg-transparent dark:bg-base-100 dark:text-dark-light px-4 py-2 border-0 border-b-2 border-slate-300 focus:border-violet outline-none text-lg font-montserrat text-dark-hard"
                        >
                          <option value="">Chọn trạng thái</option>
                          {dataPostStatus.map((item) => (
                            <option key={item.id} value={item.title}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <UploadFilePdf
                        postId={data?._id}
                        token={userState.userInfo.token}
                      />
                    </div>
                  </div>

                  <div className="w-full mt-24">
                    {!isLoading && !isError && (
                      <>
                        <p className="font-semibold text-lg text-nowrap font-opensans mb-2">
                          Nội Dung Đánh Giá
                        </p>
                        <Editor
                          content={data?.body}
                          editable={true}
                          onDataChange={(data) => {
                            setBody(data);
                          }}
                        />
                      </>
                    )}
                  </div>

                  <button
                    disabled={isLoadingUpdatePostDetail}
                    type="button"
                    className="w-full bg-green-500 text-white font-semibold rounded-lg py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handlerUpdatePost}
                  >
                    Cập nhật bài đăng
                  </button>
                </>
              )}
            </article>
          </section>
        </>
      )}
    </div>
  );
};
