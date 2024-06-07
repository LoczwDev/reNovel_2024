import React from "react";
import { images, stable } from "../constants";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ArticlesCard = ({ post, className }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ${className}`}
    >
      <Link to={`/article/${post.slug}`}>
        <img
          src={
            post.photo ? stable.UPLOAD_FOLDER_BASE_URL + post.photo : images.Yae
          }
          alt="post"
          className="w-full object-cover object-center h-60 border-b-violet-200 border-b-2 itemPhoto"
        />
      </Link>

      <div className="p-5">
        <Link to={`/article/${post.slug}`}>
          <h2 className="font-montserrat font-bold text-xl  truncate">
            {post.title}
          </h2>
          <p className=" mt-3 text-sm overflow-hidden line-clamp-3 h-16">
            {post.caption}
          </p>
        </Link>

        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src={
                post.user.avatar
                  ? stable.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.UserLogo
              }
              alt="avatar"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-light text-sm">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span className="bg-violet bg-opacity-20 w-fit p-1.5 rounded-full">
                  <FaCheck className="w-2 h-2 text-violet" />
                </span>
                <span className="italic text-dark-soft dark:text-dark-light text-sm font-semibold">
                  {post.user.admin ? "Master" : "Thuyết Giả"}
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleDateString("vi-EN", {
              month: "long",
            })}
          </span>
          <span className="font-bold text-dark-light italic text-sm">
            {post.view}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticlesCard;
