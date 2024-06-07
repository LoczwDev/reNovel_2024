import React from "react";

export const ImgBanner = ({ titleImg }) => {
  return (
    <div className="item w-full lg:h-[400px] h-[100px]">
      <img className="!w-full object-cover h-full " src={titleImg} alt="" />
    </div>
  );
};
