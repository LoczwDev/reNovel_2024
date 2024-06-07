import React, { useEffect, useState } from "react";

import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";

import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stable } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestPost from "./container/SuggestPost";
import CommentsContainer from "../../components/comments/CommentsContainer";
import ShareButton from "../../components/ShareButton";

import { getDetailsPost, getAllPosts } from "../../services/index/posts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingDetails } from "./container/LoadingDetails";
import ErroMessage from "../../components/ErroMessage";
import { useSelector } from "react-redux";
import parseJson from "../../utils/parseJSON";
import Editor from "../../components/editor/Editor";
import { categoryOption } from "../../utils/selectMultiTag";
import RatingForm from "./container/RatingForm";
import { SlBookOpen } from "react-icons/sl";
import { FaHeart } from "react-icons/fa6";
import { createFavorite } from "../../services/index/favorite";
import { FavoriteDetails } from "./container/FavoriteDetails";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { ButtonDownPdf } from "./container/ButtonDownPdf";
import { ButtonPayment } from "./container/ButtonPayment";

const ArticleDetailPage = () => {
  const userState = useSelector((state) => state.user);
  const [body, setBody] = useState(null);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const { slug } = useParams();

  const {
    data,
    isLoading,
    isError,
    refetch: ref,
  } = useQuery({
    queryFn: () => getDetailsPost({ slug }),
    queryKey: ["article", slug],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (data) {
      setBody(parseJson(data?.body));

      setBreadCrumbsData([
        {
          name: "Trang Chủ",
          link: "/",
        },
        {
          name: "Bài Viết",
          link: "/articles",
        },
        {
          name: `${data.title}`,
          link: `/blog/${data.slug}`,
        },
      ]);
    }
  }, [data, ref]);

  return (
    <MainLayout>
      {isLoading ? (
        <LoadingDetails />
      ) : isError ? (
        <ErroMessage message="Không tìm thấy dữ liệu" />
      ) : (
        <section className="flex-col lg:flex lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            {data && (
              <>
                <div className="relative w-full h-[100%] py-7">
                  <div className="mx-auto max-w-7xl">
                    <BreadCrumbs
                      data={breadCrumbsData}
                      classname={"lg:text-white"}
                    />
                    <div className="absolute left-0 top-0 h-[100%] w-full overflow-hidden hidden lg:block ">
                      <img
                        className="rounded-xl object-cover object-center lg:h-[200%] lg:w-[200%] h-auto w-auto blur-2xl m-7"
                        src={
                          data.photo
                            ? stable.UPLOAD_FOLDER_BASE_URL + data.photo
                            : images.Yae
                        }
                        alt={data.title}
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-[#000] opacity-[.65]"></div>
                    </div>
                    <div className="lg:flex md:block gap-x-5">
                      <img
                        className="rounded-xl object-cover object-center lg:w-[400px] lg:h-[550px] w-full h-full z-10"
                        src={
                          data.photo
                            ? stable.UPLOAD_FOLDER_BASE_URL + data.photo
                            : images.Yae
                        }
                        alt={data.title}
                      />
                      <div className="flex flex-col justify-end gap-y-3 flex-grow lg:w-2/4 z-10">
                        <h1 className="text-3xl font-montserrat lg:text-white font-semibold mt-2 lg:mt-0">
                          {data.title}
                        </h1>
                        <p className="font-bold text-sm w-full text-purple-400 ">
                          Người đăng:{" "}
                          <span className="font-normal text-lg text-nowrap lg:text-white">
                            {data?.user?.name}
                          </span>{" "}
                        </p>
                        <div className=" z-10">
                          <RatingForm
                            postId={data?._id}
                            averageRating={data?.averageRating}
                            refetchIsRating={ref}
                          />
                        </div>
                        <div className="flex lg:text-white gap-y-2 gap-x-2 flex-wrap">
                          <div className="flex flex-col border-r lg:pr-5 px-5 py-3 gap-y-2 w-[48%] lg:w-auto">
                            <p>Quốc Gia</p>
                            <div className="flex gap-x-2 items-center">
                              <BiWorld />
                              <span>{data?.country}</span>
                            </div>
                          </div>
                          <div className="flex flex-col border-r px-5 py-3 gap-y-2 w-[48%] lg:w-auto">
                            <p>Lượt truy cập</p>
                            <div className="flex gap-x-2 items-center">
                              <MdOutlineRemoveRedEye />
                              <span>{data?.view}</span>
                            </div>
                          </div>

                          <div className="flex flex-col border-r px-5 py-3 gap-y-2 w-[48%] lg:w-auto">
                            <p>Trang Thái</p>
                            <div className="flex gap-x-2 items-center text-sm">
                              <span>{data.status}</span>
                            </div>
                          </div>
                          <FavoriteDetails
                            userState={userState}
                            postId={data?._id}
                          />
                        </div>
                        <div className="flex gap-x-2 gap-y-3 flex-wrap justify-start lg:justify-normal mt-3">
                          {data?.category.map((category) => (
                            <div
                              key={category._id}
                              className="border-violet bg-opacity-20 text-violet bg-violet px-3.5 py-2 rounded-xl "
                            >
                              <span className="text-sm font-montserrat font-semibold">
                                {category.title}
                              </span>
                            </div>
                          ))}
                        </div>

                        <p className="text-purple-400 text-nowrap font-bold text-sm w-full">
                          Thời Điểm:
                          <span className="text-nowrap font-normal ml-2 text-white">
                            {" "}
                            {new Date(data.createdAt).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="w-60 h-1 mx-auto lg:my-10 bg-gray-100 border-0 rounded my-10 dark:bg-gray-700"></hr>
                <div className="flex-col flex w-full mx-auto max-w-7xl">
                  <div className="flex-1">
                    <div>
                      <h4 className="italic font-montserrat font-normal text-2xl">
                        Giới thiệu tác phẩm
                      </h4>
                      <div className="italic text-base text-justify pl-4 border border-violet px-2 py-3 rounded-lg">
                        <p>{data.caption}</p>
                      </div>
                    </div>
                    <hr className="w-60 h-1 mx-auto lg:my-10 bg-gray-100 border-0 rounded my-10 dark:bg-gray-700"></hr>

                    <h4 className="italic font-montserrat font-normal text-2xl mt-3">
                      Đánh Giá
                    </h4>
                    <div className="w-full lg:flex lg:flex-row gap-x-5">
                      <div className="lg:w-3/4 w-full">
                        {!isLoading && !isError && (
                          <Editor
                            className={"border-none"}
                            content={data.body}
                            editable={false}
                          />
                        )}
                      </div>
                      <div className="lg:w-1/4 w-full">
                        <SuggestPost
                          className="mt-8 lg:max-w-full"
                          header="Bài viết liên quan"
                          posts={postsData?.data}
                          tags={data?.tags}
                        />
                        <div className=" w-full shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-lg p-4 mt-8 lg:max-w-full ">
                          <p className="font-montserrat text-dark-hard font-bold text-xl dark:text-dark-light">
                            FIle Truyện
                          </p>
                          <p className="font-montserrat text-dark-hard italic text-sm dark:text-dark-light">
                            *(Nội dung tiểu thuyết hoàn toàn thuộc quyền sở hữu
                            của tác giả)
                          </p>
                          <ButtonPayment postId={data?._id} slug={data?.slug} />
                          <ButtonDownPdf postId={data?._id} />
                        </div>
                        <div className="mt-7">
                          <h2 className="font-montserrat lg:text-md text-dark-hard mb-4 text-xl  dark:text-dark-light">
                            Share on:
                          </h2>
                          <ShareButton
                            url={encodeURI(
                              "https://zens-joker-pk6l.vercel.app/"
                            )}
                            title={encodeURIComponent(data?.title)}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="w-60 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

                    <hr className="w-60 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
                    <h4 className="italic font-montserrat font-normal text-2xl mb-3">
                      Bình Luận
                    </h4>
                    <div>
                      <CommentsContainer
                        className="lg:mx-10"
                        comments={data.comments}
                        slugPost={slug}
                        logginedUserId={userState?.userInfo?._id}
                        refetch={ref}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </article>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
