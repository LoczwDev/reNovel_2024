import React from "react";

export const SelectCategoryDisplay = () => {
  return (
    <div className="w-80">
      <div className="flex items-center justify-between gap-x-3">
        <h3 className="text-base text-nowrap">Thể Loại</h3>
        <select
          onChange={(e) => handleType(e.target.value)}
          value={isCheckTypePost}
          className="block py-2.5 px-5 m-3 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
  );
};
