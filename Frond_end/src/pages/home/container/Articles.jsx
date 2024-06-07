import React, { useEffect } from "react";
import ArticlesCard from "../../../components/ArticlesCard";
import { GrLinkNext } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { getAllPostHome, getAllPosts } from "../../../services/index/posts";
import toast from "react-hot-toast";
import { LoadingCard } from "../../../components/LoadingCard";
import ErroMessage from "../../../components/ErroMessage";
import { Link, useLocation } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const   Articles = () => {
  const location = useLocation();
  const options = {
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllPostHome(),
    queryKey: ["postHome"],
    onSuccess: (data) => {
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <section className="flex flex-col container mx-auto px-5 py-10">
      {data?.data.length > 0 ? (
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading ? (
            [...Array(4)].map((item, index) => (
              <LoadingCard
                key={index}
                className="w-full md:w-[calc(50%-11px)] lg:w-[calc(25%-16px)]"
              />
            ))
          ) : isError ? (
            <ErroMessage message="Không thể tải đươc bài viết" />
          ) : (
            <>
              <h2 className="font-montserrat text-2xl font-semibold">
                Bài Đăng Mới
              </h2>
              <OwlCarousel
                {...options}
                className="owl-theme mx-auto"
                loop
                nav
                margin={15}
                items={4}
              >
                {data?.data
                  .filter((post) => post.checked === true)
                  .map((post, index) => (
                    <ArticlesCard
                      key={index}
                      post={post}
                      className="w-full item"
                    />
                  ))}
              </OwlCarousel>
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-5 font-bold text-xl text-red-500">
          Hiện tại chưa có bài đăng nào
        </div>
      )}

      <button className=" mx-auto  text-violet border-2 border-violet px-6 py-3 rounded-lg hover:bg-violet hover:text-white">
        <Link to={"/articles"} className="flex items-center gap-x-2 font-bold">
          <span>More Post</span>
          <GrLinkNext className="w-5 h-5" />
        </Link>
      </button>
    </section>
  );
};

export default Articles;
