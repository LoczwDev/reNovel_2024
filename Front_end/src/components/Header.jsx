import React, { useContext, useEffect, useState } from "react";
import { images, stable } from "../constants";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "../services/index/users";
import { FaRegUser } from "react-icons/fa6";
import InputSearch from "./container/InputSearch";
import { CheckUser } from "./container/CheckUser";

import Navitem from "../pages/admin/components/Navitem";
import { NavItem } from "./container/NavItem";
import { getAllTags } from "../services/index/tags";
import { ButtonTheme } from "./container/ButtonTheme";
import toast from "react-hot-toast";

const Header = () => {
  const navItemInfo = [
    {
      name: "Trang Chủ",
      type: "link",
      href: "/",
    },
    {
      name: "Bài Đăng",
      type: "link",
      href: "/articles",
    },
    {
      name: "Chủ Đề",
      type: "dropdown",
      items: [
        { title: "About us", href: "/about" },
        { title: "Contact us", href: "/contact" },
      ],
    },
    {
      name: "Pricing",
      type: "link",
      href: "/pricing",
    },
    {
      name: "Faq",
      type: "link",
      href: "/faq",
    },
  ];
  const navigate = useNavigate();
  const dispath = useDispatch();
  const queryClient = useQueryClient();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setProfileDropDown] = useState(false);

  const navIsVisibleHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const { data: dataTags } = useQuery({
    queryFn: () => getAllTags(),
    queryKey: ["tags"],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(dataTags, "tagsData");

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const logoutHandler = () => {
    toast.success("Đăng xuất thành công");
    dispath(logout());
  };
  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-base-100">
      <header className="container mx-auto px-5 py-4 flex items-center justify-between">
        <div>
          <Link to="/">
            <img className="w-32" src={images.Logo} alt="logo" />
          </Link>
        </div>
        <div className="lg:hidden z-50 flex items-center gap-x-2">
          <ButtonTheme />
          {navIsVisible ? (
            <IoIosClose className="w-7 h-7" onClick={navIsVisibleHandler} />
          ) : (
            <IoIosMenu className="w-7 h-7" onClick={navIsVisibleHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } flex-col-reverse transition-all duration-500 bg-purple-500 lg:bg-transparent mt-[62px] lg:mt-0 z-[40] fixed lg:static justify-center lg:justify-between w-full top-0 bottom-0 flex lg:flex-row  gap-x-5 items-center`}
        >
          {dataTags && (
            <ul className="flex flex-col lg:flex-row gap-y-5 items-center font-bold  gap-x-5 list-none lg:flex-auto lg:mx-3 w-auto ">
              {navItemInfo.map((item) => (
                <NavItem key={item.name} item={item} dataTags={dataTags} />
              ))}
            </ul>
          )}

          {userState && <CheckUser />}
          <InputSearch />
          {!navIsVisible && <ButtonTheme className={""} />}

          {/* Profile */}
          {userState?.userInfo?.verified ? (
            <div className="flex lg:flex-row flex-col items-center justify-between w-full lg:w-auto gap-x-10">
              {" "}
              <div className="lg:my-auto my-3 flex flex-col lg:flex-row gap-y-5 items-center font-bold text-dark-hard gap-x-5">
                <div className="flex flex-col gap-2 justify-center items-center group relative">
                  <button
                    className="relative flex gap-1 items-center"
                    onClick={() => setProfileDropDown(!profileDropdown)}
                  >
                    <div className="relative w-12 h-12 rounded-full outline-offset-2 outline-1 outline-primary overflow-hidden">
                      <label
                        htmlFor="avatarHeader"
                        className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
                      >
                        {profileData?.avatar ? (
                          <img
                            src={
                              stable.UPLOAD_FOLDER_BASE_URL +
                              profileData?.avatar
                            }
                            className="w-full object-cover"
                            alt="profileAvatar"
                          />
                        ) : (
                          <div className="">
                            <FaRegUser className="w-[40px] h-[50px] p-2 dark:text-white duration-200" />
                          </div>
                        )}
                      </label>
                    </div>
                    <FaChevronDown className="w-2 h-2 dark:text-white duration-200" />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-4 lg:bottom-0 lg:-left-5 w-max lg:absolute lg:transform lg:translate-y-full lg:group-hover:block`}
                  >
                    <ul className="flex flex-col overflow-hidden lg:shadow-lg rounded-lg bg-violet dark:bg-base-100 lg:bg-white text-center z-30">
                      {userState?.userInfo?.admin && (
                        <button
                          onClick={() => navigate("/admin")}
                          type="button"
                          className="px-4 py-2 hover:bg-violet hover:text-black  text-black lg:text-dark-soft dark:text-dark-light"
                        >
                          <Link>Quản Lý Admin</Link>
                        </button>
                      )}

                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="px-4 py-2 hover:bg-violet hover:text-black  text-black lg:text-dark-soft dark:text-dark-light"
                      >
                        <Link>Profile</Link>
                      </button>
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="px-4 py-2 hover:bg-violet hover:text-black  text-black lg:text-dark-soft dark:text-dark-light"
                      >
                        <Link>Đăng Xuất</Link>
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="dark:border-gray-200 mt-5 lg:mt-0 border-2 border-neutral-900 rounded-full px-6 py-2 text-neutral-700 font-semibold hover:bg-neutral-900 hover:text-neutral-300 transition-all duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
