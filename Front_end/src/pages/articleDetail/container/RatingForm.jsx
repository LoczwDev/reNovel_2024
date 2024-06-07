import React, { useState } from "react";
import { createRating, getRatingByPost } from "../../../services/index/rating";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RatingForm = ({ postId, averageRating, refetchIsRating }) => {
  const userState = useSelector((state) => state.user);
  //   console.log(token, "tao nla");
  const [score, setScore] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const {
    data: dataRating,
    isLoading: isLoadingGetRating,
    refetch,
  } = useQuery({
    queryFn: () => getRatingByPost({ postId }),
    queryKey: ["ratings"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(dataRating, "dataRating");

  const { mutate: mutateCreateRating, isLoading: isLoadingCreateRating } =
    useMutation({
      mutationFn: ({ token, postId, score }) => {
        return createRating({
          token: userState?.userInfo?.token,
          postId,
          score,
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        console.log("Đánh giá đã được tạo thành công", data);
        toast.success("Đánh giá đã được tạo thành công", data);
        refetch();
        refetchIsRating();
      },
    });

  const handleRatingClick = (selectedScore) => {
    console.log(selectedScore, "selectedScore");
    setScore(selectedScore);
    mutateCreateRating({
      token: userState?.userInfo?.token,
      postId,
      score: selectedScore,
    });
    refetch();
    refetchIsRating();
  };

  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starImageUrl =
        i <= averageRating
          ? "https://truyen.tangthuvien.vn/images/star-on.02731.png"
          : "https://truyen.tangthuvien.vn/images/star-off.b2a1b.png";
      const starTitle =
        i === 1
          ? "Quá tệ"
          : i === 2
          ? "Không hay lắm"
          : i === 3
          ? "Cũng được"
          : i === 4
          ? "Khá hay"
          : "Rất hay";

      stars.push(
        <img
          key={i}
          src={starImageUrl}
          alt={i.toString()}
          title={starTitle}
          className="w-6 h-6"
          onClick={() => handleRatingClick(i)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      );
    }

    return stars;
  };
  const handleMouseOver = (event) => {
    event.target.setAttribute("alt", event.target.getAttribute("title"));
  };

  const handleMouseOut = (event) => {
    event.target.setAttribute("alt", event.target.getAttribute("alt"));
  };

  return (
    <div className="flex lg:mt-0 mt-5 lg:flex-col lg:gap-x-5 gap-x-10 items-center lg:items-start justify-center lg:justify-normal">
      <p className="lg:text-3xl text-6xl italic font-semibold text-[32px] leading-[38px] text-[#666] lg:hidden">
        {averageRating}
      </p>
      <div>
        {" "}
        <p className="text-sm text-[#a6a6a6] font-bold font-montserrat mb-2 ">
          {dataRating?.length} đánh giá
        </p>
        {isLoadingCreateRating && <p>Có lỗi xảy ra khi tạo đánh giá.</p>}
        <div className="flex gap-x-2 items-center">
          <div className="score-mid flex gap-x-2" style={{ cursor: "pointer" }}>
            {renderStarRating()}
          </div>
          <p className="lg:text-3xl text-6xl italic font-semibold text-[32px] leading-[38px] text-[#666] hidden lg:block">
            {averageRating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingForm;
