import React from "react";
import { getAllUsers } from "../../../services/index/users";
import { useQuery } from "@tanstack/react-query";
import { CardItemAdmin } from "../components/CardItemAdmin";
import { FaRegUser } from "react-icons/fa";
import { TfiViewListAlt } from "react-icons/tfi";
import { SlTag } from "react-icons/sl";
import { HiOutlineEye } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa6";
import { RiArrowUpSLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { getAllPosts, getAllPostsAdmin } from "../../../services/index/posts";
import { getAllTags } from "../../../services/index/tags";

export const Admin = () => {
  const { data: UserData } = useQuery({
    queryFn: () => getAllUsers({ email: "" }),
    queryKey: ["users"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { data: Postuser } = useQuery({
    queryFn: () => getAllPostsAdmin(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { data: TagsData } = useQuery({
    queryFn: () => getAllTags(),
    queryKey: ["tags"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const currentDate = new Date();
  const previousWeekDate = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );
  const totalView = Postuser?.data
    ?.filter(
      (post) =>
        new Date(post.updatedAt).getTime() >= previousWeekDate.getTime() &&
        new Date(post.updatedAt).getTime() <= currentDate.getTime()
    )
    .reduce((sum, post) => sum + (post.view || 0), 0);

  return (
    <div className="flex gap-x-2 w-full flex-wrap">
      <CardItemAdmin
        total={UserData?.length}
        title={"Số Tài Khoản Hoạt Động"}
        icon={<FaRegUser />}
      />
      <CardItemAdmin
        total={Postuser?.data?.length}
        title={"Số Bài Đăng Hiện Tại"}
        icon={<TfiViewListAlt />}
      />
      <CardItemAdmin
        total={totalView}
        title={"Lượt Truy Cập Theo Tuần"}
        icon={<HiOutlineEye />}
      />
      <CardItemAdmin
        total={TagsData?.length}
        title={"Tổng Số Chủ Đề"}
        icon={<SlTag />}
      />
    </div>
  );
};
