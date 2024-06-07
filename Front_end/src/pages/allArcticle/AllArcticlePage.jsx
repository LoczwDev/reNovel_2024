// import React, { useState } from "react";
// import { AsideFillter } from "./FillterArcticlePage";
// import MainLayout from "../../components/MainLayout";
// import RatingForm from "../articleDetail/container/RatingForm";
// import { useSelector } from "react-redux";

// import { useQuery } from "@tanstack/react-query";
// import { getAllPosts } from "../../services/index/posts";
// import { images, stable } from "../../constants";

// export const AllArcticlePage = () => {

//   const { data: postsData } = useQuery({
//     queryFn: () => getAllPosts(),
//     queryKey: ["posts"],
//     onError: (error) => {
//       toast.error(error.message);
//       console.log(error);
//     },
//   });

//   console.log(postsData?.data, "data");
//   return (
//     <MainLayout>
//       <div className="container mx-auto max-w-7xl flex-col px-5 py-5 lg:flex lg:flex-row lg:gap-x-5 lg:items-start">
//         <AsideFillter />
//         <div>
//           <h2 className="font-bold text-lg mb-4">BỘ LỌC</h2>
//           {postsData?.data?.map((item, index) => (
//             <div key={index}>
//               <div className="lg:flex md:block gap-x-5">
//                 <img
//                   className="rounded-xl object-cover object-center lg:h-60 lg:w-60 h-full w-full"
//                   src={
//                     item.photo
//                       ? stable.UPLOAD_FOLDER_BASE_URL + item.photo
//                       : images.Yae
//                   }
//                   alt={item.title}
//                 />
//                 <div className="flex flex-col gap-y-3 flex-grow lg:w-2/4">
//                   <h1 className="text-2xl font-montserrat text-dark-hard font-bold ">
//                     {item.title}
//                   </h1>
//                   <p className="font-bold text-sm w-full ">
//                     Người đăng:{" "}
//                     <span className="font-normal text-lg text-nowrap">
//                       {item?.user?.name}
//                     </span>{" "}
//                   </p>
//                   <p className="text-gray-900 text-nowrap font-bold text-sm w-full">
//                     Thời Điểm:
//                     <span className="text-nowrap font-normal ml-2">
//                       {" "}
//                       {new Date(item.createdAt).toLocaleDateString("vi-VN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </p>
//                   <p className="leading-7 overflow-hidden line-clamp-4" id="caption">
//                     {item.caption}
//                   </p>
//                 </div>
//                 <p className="lg:text-lg text-6xl italic font-semibold text-[32px] leading-[38px] text-[#666] mb-2">
//                   {item.averageRating}
//                 </p>
//               </div>
//               <hr className="w-60 h-1 my-2 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700"></hr>
//             </div>
//           ))}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };
