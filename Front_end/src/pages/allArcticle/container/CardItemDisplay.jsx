import React from "react";
import { images, stable } from "../../../constants";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const CardItemDisplay = ({ postsData }) => {
  return (
    <div className="flex items-center flex-wrap gap-x-[12px] gap-y-3 lg:flex-row flex-col lg:justify-normal justify-center">
      {postsData?.data
        ?.filter((item) => (item.checked = true))
        .map((item, index) => (
          <div
            key={index}
            className="relative group w-[289px] h-96 overflow-hidden bg-black border rounded-3xl"
          >
            <img
              className="object-cover w-full h-full transform duration-700 backdrop-opacity-100"
              src={
                item.photo
                  ? stable.UPLOAD_FOLDER_BASE_URL + item.photo
                  : images.Yae
              }
              alt={item.title}
            />
            <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
            <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
              <div className="absolute w-full flex place-content-center">
                <p className="capitalize font-montserrat font-bold text-center text-base shadow-2xl text-white mt-10">
                  {item.title}
                </p>
              </div>
              <div className="absolute w-full flex place-content-center mt-20">
                <p className="font-sans text-center w-4/5 text-white mt-5 line-clamp-6">
                  {item.caption}
                </p>
              </div>
              <div className="absolute w-full flex  justify-center bottom-0 items-center top-64">
                <button className="left-1/4 bottom-4 border-violet text-violet hover:bg-opacity-20 hover:bg-violet font-bold rounded-lg h-10 w-48">
                  <Link to={`/article/${item.slug}`}>Xem Đánh Giá</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
