import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images, stable } from "../../../constants";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa6";
import Navitem from "./Navitem";
import NavitemCollap from "./NavitemCollap";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createPost } from "../../../services/index/posts";
import { logout } from "../../../store/actions/user";
import { FaRegUser } from "react-icons/fa";
import { ButtonTheme } from "../../../components/container/ButtonTheme";

export const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const dispath = useDispatch();
  const queryClient = useQueryClient();
  const [menuActive, setMenuActive] = useState(false);
  const [navName, setNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const menuHandler = () => {
    setMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setMenuActive(false);
    } else {
      setMenuActive(true);
    }
  }, [windowSize.width]);

  const logoutHandler = () => {
    toast.success("Đăng xuất thành công");
    dispath(logout());
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-base-200 flex  w-full items-center justify-between p-4 lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start z-50">
      <Link to={"/"}>
        <img src={images.Logo} className="w-32 lg:hidden" alt="logo" />
      </Link>
      <div className="cursor-pointer lg:hidden">
        {menuActive ? (
          <IoIosClose className="w-6 h-6" onClick={menuHandler} />
        ) : (
          <IoIosMenu className="w-6 h-6" onClick={menuHandler} />
        )}
      </div>
      {menuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden "
            onClick={menuHandler}
          />
          {/* sideBar */}
          <div className=" fixed top-0 bottom-0 left-0 z-50 w-3/4 h-auto overflow-y-auto p-4 lg:static lg:h-full lg:w-full lg:p-6 bg-white dark:bg-base-200 ">
            <Link>
              <img src={images.Logo} className="w-32" alt="" />
            </Link>
            <div className="my-5 flex items-center gap-x-1">
              <div className="w-10 h-10 rounded-full border border-black">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={
                    userState?.userInfo?.avatar
                      ? stable.UPLOAD_FOLDER_BASE_URL +
                        userState?.userInfo?.avatar
                      : images.UserLogo
                  }
                  alt=""
                />
              </div>
              <button
                onClick={logoutHandler}
                type="button"
                className="px-4 py-2 hover:bg-black hover:text-white text-black lg:text-dark-soft dark:text-dark-light duration-200 rounded-lg"
              >
                <a className="" href="">
                  Đăng Xuất
                </a>
              </button>
            </div>
            <h4 className="mt-10 text-xl font-bold text-gray-500">Main Menu</h4>
            <div className="flex flex-col">
              <Navitem
                title="Dashboard"
                link="/admin"
                icon={<LuLayoutDashboard className="text-xl" />}
                name="dashboard"
                navName={navName}
                setNavName={setNavName}
              />

              <Navitem
                title="Tài khoản"
                link="/admin/users"
                icon={<FaRegUser className="text-xl" />}
                name="users"
                navName={navName}
                setNavName={setNavName}
              />

              <Navitem
                title="Bình luận"
                link="/admin/comments"
                icon={<FaRegComment className="text-xl" />}
                name="comments"
                navName={navName}
                setNavName={setNavName}
              />

              <NavitemCollap
                title="Bài dăng"
                icon={<LuLayoutDashboard className="text-xl" />}
                name="posts"
                navName={navName}
                setNavName={setNavName}
              >
                <Link
                  to="/admin/posts/manage"
                  className="text-lg font-semibold"
                >
                  Tất cả bài đăng
                </Link>
                <Link
                  to="/admin/categorypost"
                  className="text-lg font-semibold"
                >
                  Quản lý thể loại
                </Link>
                <Link to="/admin/tags" className="text-lg font-semibold">
                  Quản lý Tags
                </Link>
              </NavitemCollap>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
