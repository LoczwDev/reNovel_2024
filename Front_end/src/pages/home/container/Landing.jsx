import React from "react";
import { images } from "../../../constants";

export const Landing = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-3/4">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Bước vào thế giới hấp dẫn của văn học
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Khám phá văn học tại trang web của chúng tôi - nơi tận hưởng những bài
          đánh giá tiểu thuyết đầy sức hút và chia sẻ cảm xúc với cộng đồng đam
          mê văn học.
        </p>
        {/* <Search className="mt-10 lg:mt-6 xl:mt-10" /> */}
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base ul_none-list">
            <li className="rounded-lg bg-violet bg-opacity-10 px-3 py-1.5 text-violet font-semibold">
              Review Tiểu Thuyết
            </li>
            <li className="rounded-lg bg-violet bg-opacity-10 px-3 py-1.5 text-violet font-semibold">
              Trích Dẫn Hay
            </li>
            <li className="rounded-lg bg-violet bg-opacity-10 px-3 py-1.5 text-violet font-semibold">
              Top tác phẩm 2024
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img
          className="w-full"
          src={images.Landing}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};
