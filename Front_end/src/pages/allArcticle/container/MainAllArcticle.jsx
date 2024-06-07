import React, { useState } from "react";
import { images, stable } from "../../../constants";
import { Link } from "react-router-dom";

const MainAllArcticle = ({ postsData, dataUserPost }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  console.log(postsData, "posttttttttttt");

  return (
    <div className="w-full">
      {postsData?.data
        ?.filter((item) => item.checked === true)
        .map((item, index) => (
          <div key={index}>
            <div className="lg:flex md:block gap-x-5">
              <Link to={`/article/${item?.slug}`}>
                <img
                  className="rounded-xl object-cover object-center lg:h-60 lg:w-60 h-full w-full"
                  src={
                    item.photo
                      ? stable.UPLOAD_FOLDER_BASE_URL + item.photo
                      : images.Yae
                  }
                  alt={item.title}
                />
              </Link>
              <div className="flex flex-col gap-y-3 flex-grow lg:w-2/4">
                <h1 className="text-2xl font-montserrat font-bold ">
                  {item.title}
                </h1>
                <p className="font-bold text-sm w-full ">
                  Người đăng:{" "}
                  <span className="font-normal text-lg text-nowrap">
                    {item?.user?.name}
                  </span>{" "}
                </p>
                <p className="text-gray-900 dark:text-gray-200 text-nowrap font-bold text-sm w-full">
                  Thời Điểm:
                  <span className="text-nowrap font-normal ml-2">
                    {" "}
                    {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <p
                  className="leading-7 overflow-hidden line-clamp-4"
                  id="caption"
                >
                  {item.caption}
                </p>
              </div>
              <p className="lg:text-lg text-6xl italic font-semibold text-[32px] leading-[38px] text-[#666] mb-2 lg:block hidden">
                {item.averageRating}
              </p>
            </div>
            <hr className="w-60 h-1 my-2 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700"></hr>
          </div>
        ))}
    </div>
  );
};

export default MainAllArcticle;
