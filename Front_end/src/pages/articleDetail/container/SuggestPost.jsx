import React from "react";
import { images, stable } from "../../../constants";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllPosts } from "../../../services/index/posts";

const SuggestPost = ({ className, header, posts = [], tags }) => {
  const { data: postsData, isFetched } = useQuery({
    queryFn: () => getAllPosts({}),
    queryKey: ["postSuggest"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const postSuggest = postsData?.data?.filter(
    (item) => item.tags?.title === tags?.title
  );
  console.log(postsData, "posstyssssss");
  console.log(tags.title, "tags");
  return (
    <div
      className={`mt-3 w-full shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-lg p-4 ${className} `}
    >
      <h2 className="font-montserrat text-dark-hard font-bold text-xl dark:text-dark-light">
        {header}
      </h2>
      {isFetched && (
        <div className="grid gap-y-5 py-5 md:grid-cols-2 lg:grid-cols-1 border-b border-violet">
          {postSuggest?.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="flex space-x-3 flex-nowrap items-center"
            >
              <img
                className="aspect-square object-cover rounded-lg w-1/6"
                src={
                  item?.photo
                    ? stable.UPLOAD_FOLDER_BASE_URL + item?.photo
                    : images.Yae
                }
                alt={item.title}
              />
              <div className="text-sm font-montserrat text-dark-hard dark:text-dark-light font-medium">
                <Link to={`/article/${item.slug}`}>
                  <h3 className="text-base line-clamp-2">{item.title}</h3>
                </Link>

                <span className="text-xs opacity-60">
                  {new Date(item.createdAt).toLocaleDateString("en-US")}
                </span>
                {/* <span className="text-xs opacity-60">{item.createdAt}</span> */}
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-montserrat font-medium text-dark-hard dark:text-dark-light mt-8 italic text-lg">
        Tags:{" "}
      </h2>
      <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
        <div>
          <Link
            to="/"
            className="inline-block rounded-md px-3 py-1.5 bg-violet font-montserrat text-xs text-white"
          >
            {tags.title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuggestPost;
