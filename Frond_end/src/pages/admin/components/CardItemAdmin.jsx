import React from "react";

export const CardItemAdmin = ({ total, title, icon }) => {
  return (
    <div className="bg-yellow-100 shadow-lg rounded-2xl p-4 mt-2 lg:w-[49%] w-full ">
      <div className="flex items-center">
        <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-purple-800 to-violet rounded-lg shadow-md shadow-gray-300">
          <span> {icon}</span>
        </div>
        <div className="">
          <div className=" rounded-2xl  flex flex-col p-3 text-black font-bold text-xl">
            <span>{total}</span>
            <p className="font-normal text-sm">{title}</p>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500"></div>
      </div>
    </div>
  );
};
