import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import RatingForm from "../articleDetail/container/RatingForm";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import { images, stable } from "../../constants";
import MainAllArcticle from "./container/MainAllArcticle";
import toast from "react-hot-toast";
import { SelectMultiple } from "../admin/components/selectmuti/SelectMultiple";
import { getAllCategory } from "../../services/index/postCategory";
import Pagination from "../../components/Pagination";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingCard } from "../../components/LoadingCard";
import ArticlesCard from "../../components/ArticlesCard";
import { CardItemDisplay } from "./container/CardItemDisplay";

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
const BreadCrumbsData = [
  {
    name: "Trang Chủ",
    link: "/",
  },
  {
    name: "Bài Viết",
    link: "/articles",
  },
];

export const FillterArcticlePage = () => {
  const location = useLocation();
  const [isFlag, setIsFlag] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [isCheckStatus, setIsCheckStatus] = useState("");
  const [isCheckCountry, setIsCheckCountry] = useState("");
  const [isCheckTypePost, setIsCheckTypePost] = useState("");
  const [isCheckSort, setIsCheckSort] = useState("");
  // const [isValueTags, setIsValueTags] = useState("");

  const navigate = useNavigate();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const searchValue = new URLSearchParams(location.search).get("search");
  const tagsValue = new URLSearchParams(location.search).get("tags");
  // searchKeyWord = "",
  // page = 1,
  // limit = 10,
  // category = "",
  // country = "",
  // status = "",
  // tags = "",
  // sort = "",
  const {
    data: postsData,
    isLoading: isLoadingPost,
    refetch,
  } = useQuery({
    queryFn: () =>
      getAllPosts({
        searchKeyWord: searchValue ? searchValue : "",
        page: currentPage,
        limit: 10,
        category: isCheckTypePost,
        country: isCheckCountry,
        status: isCheckStatus,
        tags: tagsValue ? tagsValue : "",
        sort: isCheckSort,
      }),
    queryKey: ["PostsFilter"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(postsData, "postdata");

  const { data: categoryData } = useQuery({
    queryFn: () => getAllCategory(),
    queryKey: ["category"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // console.log(categoryData, "categoryData");
  // const location = useLocation();
  useEffect(() => {
    if (isFlag) {
      setIsFlag(false);
      return;
    }
    refetch();
  }, [
    refetch,
    isCheckStatus,
    isCheckCountry,
    isCheckTypePost,
    currentPage,
    isCheckSort,
    searchValue,
    tagsValue,
  ]);

  const handleStatus = (statusTitle) => {
    if (statusTitle === "Toàn Bộ") {
      setIsCheckStatus("");
    } else {
      setIsCheckStatus(statusTitle);
    }
    setCurrentPage(1);
    refetch();
  };

  const handleCountry = (countryTitle) => {
    setIsCheckCountry(countryTitle);
    setCurrentPage(1);
    refetch();
  };
  const handleType = (typeId) => {
    setIsCheckTypePost(typeId);
    setCurrentPage(1);
    refetch();
  };

  const handleSortChange = (e) => {
    setIsCheckSort(e.target.value);
    refetch();
  };

  // console.log(setIsCheckSort, "setIsCheckSort");

  return (
    <MainLayout>
      <div className="container m-auto px-5 py-5 ">
        <div className="w-full">
          <BreadCrumbs data={BreadCrumbsData} wfull={"w-full"} />
        </div>
        <div className="flex gap-x-5 items-center w-full flex-wrap">
          <div className="w-80">
            {/* <hr hr className="lg:w-60 w-1/2 h-1 my-2 bg-gray-100 border-0 rounded  dark:bg-gray-700"></hr> */}
            <div className="flex items-center justify-between gap-x-3">
              <h3 className="text-base text-nowrap">Tình Trạng</h3>
              <select
                onChange={(e) => handleStatus(e.target.value)}
                value={isCheckStatus}
                className="dark:bg-base-100 block py-2.5 px-5 m-3 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="">Tất cả</option>
                {dataPostStatus.map((item) => (
                  <option key={item.id} value={item.title} className="text-lg">
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-80">
            {/* <hr className="lg:w-60 w-1/2 h-1 my-2 bg-gray-100 border-0 rounded  dark:bg-gray-700"></hr> */}
            <div className="flex items-center justify-between gap-x-3">
              <h3 className="text-base text-nowrap">Quốc Gia</h3>
              <select
                onChange={(e) => handleCountry(e.target.value)}
                value={isCheckCountry}
                className=" dark:bg-base-100  block py-2.5 px-5 m-3 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="">Tất cả</option>
                {dataCountry.map((item) => (
                  <option key={item.id} value={item.title} className="text-lg">
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-80">
            {/* <hr className="lg:w-60 w-1/2 h-1 my-2 bg-gray-100 border-0 rounded  dark:bg-gray-700"></hr> */}
            <div className="flex items-center justify-between gap-x-3">
              <h3 className="text-base text-nowrap">Thể Loại</h3>
              <select
                onChange={(e) => handleType(e.target.value)}
                value={isCheckTypePost}
                className="dark:bg-base-100  block py-2.5 px-5 m-3 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="">Tất cả</option>
                {categoryData?.data?.map((item, index) => (
                  <option key={index} value={item._id} className="text-lg">
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="border-l-2 ml-5 pl-5">
            <button
              onClick={() => {
                setIsCheckCountry("");
                setIsCheckStatus("");
                setIsCheckTypePost("");
                navigate("/articles");
                refetch();
              }}
              className="border px-2 py-3 bg-black text-white text-lg hover:bg-white hover:text-black rounded-xl w-full delay-100 duration-300 mt-3"
            >
              Bỏ Lọc
            </button>
          </div>
        </div>
        <div className="flex items-start justify-between my-6 lg:flex-row flex-col gap-y-2">
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-2 gap-y-2 flex-wrap">
            <h2 className="font-bold text-lg mb-4">BỘ LỌC</h2>
            <div className="flex items-center lg:justify-center justify-start gap-x-2 gap-y-2 flex-wrap">
              <span
                className={`${
                  searchKeyWord
                    ? "border-violet bg-opacity-20 text-violet bg-violet px-3.5 py-2 rounded-xl"
                    : ""
                } `}
              >
                {searchKeyWord}
              </span>
              <span
                className={`${
                  isCheckStatus
                    ? "border-violet bg-opacity-20 text-violet bg-violet px-3.5 py-2 rounded-xl"
                    : ""
                } `}
              >
                {isCheckStatus}
              </span>
              <span
                className={`${
                  isCheckCountry
                    ? "border-violet bg-opacity-20 text-violet bg-violet px-3.5 py-2 rounded-xl"
                    : ""
                } `}
              >
                {isCheckCountry}
              </span>
              <span className="px-3.5 py-2">
                {categoryData?.data
                  .filter((item) => item._id === isCheckTypePost)
                  .map((item) => (
                    <span
                      className={`${
                        isCheckTypePost
                          ? "border-violet bg-opacity-20 text-violet bg-violet px-3.5 py-2 rounded-xl"
                          : ""
                      } `}
                    >
                      {item.title}
                    </span>
                  ))}
              </span>
            </div>
          </div>

          <form className="max-w-sm">
            <select
              onChange={handleSortChange}
              className="outline-none text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
            >
              <option value="">Sắp xếp theo</option>
              <option value="titlePlus">Tên: A-Z</option>
              <option value="titleDown">Tên: Z-A</option>
              <option value="viewTop">Xem Nhiều Nhất</option>
              <option value="viewBot">Xem Ít Nhất</option>
            </select>
          </form>
        </div>
        {postsData?.data.length > 0 ? (
          <div className="w-full">
            {isLoadingPost ? (
              [...Array(4)].map((item, index) => (
                <LoadingCard
                  key={index}
                  className="w-full md:w-[calc(50%-11px)] lg:w-[calc(25%-16px)]"
                />
              ))
            ) : (
              // <MainAllArcticle postsData={postsData} />
              <CardItemDisplay postsData={postsData} />
            )}

            {
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                totalPageCount={JSON.parse(
                  postsData?.headers?.["x-totalpagecount"]
                )}
              />
            }
          </div>
        ) : (
          <div className="text-center flex justify-center items-center h-[50vh] w-3/4">
            <p className="text-red-500 text-2xl">
              Không tìm thấy bài viết phù hợp
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
