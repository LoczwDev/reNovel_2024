import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import { useNavigate } from "react-router-dom";
import SearchSuggest from "../SearchSuggest";
import { CiSearch } from "react-icons/ci";

const usePostsQuery = (searchValue) => {
  return useQuery({
    queryFn: () => getAllPosts(searchValue),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

const InputSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [focusInputSearch, setFocusInputSearch] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const { data: postsData, refetch } = usePostsQuery(searchValue);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/articles?search=${searchValue}`);
      refetch();
    }
  };
  const handlerSubmitSearch = () => {
    navigate(`/articles?search=${searchValue}`);
    refetch();
  };

  return (
    <div className="lg:w-80 w-9/12 relative">
      <div className="flex item-center group ">
        <input
          onFocus={() => setFocusInputSearch(true)}
          onBlur={() => setFocusInputSearch(false)}
          type="text"
          className="focus:border-violet outline-none  border-2 border-gray-300 dark:border-gray-100 dark:bg-base-100  text-sm rounded-full  block w-full px-4 py-2 "
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handlerSubmitSearch}
          className="absolute right-3 text-xl top-2 group-hover:text-violet font-bold"
        >
          <CiSearch />
        </button>
      </div>

      {focusInputSearch && searchValue === "" && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-base-100 shadow-lg rounded-b-lg">
          <div className="flex justify-center items-center h-24">
            <p className="text-dark-light font-normal font-opensans text-base">
              Nhập tên tiểu thuyết để tìm kiếm
            </p>
          </div>
        </div>
      )}
      {searchValue !== "" && <SearchSuggest searchKeywordProp={searchValue} />}
    </div>
  );
};

export default InputSearch;
