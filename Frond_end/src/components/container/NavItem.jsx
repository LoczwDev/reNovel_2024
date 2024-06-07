import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export const NavItem = ({ item, dataTags }) => {
  const [dropDown, setDropDown] = useState(false);
  const dropDownHandle = () => {
    setDropDown((curState) => {
      return !curState;
    });
  };

  return (
    <li className="group m-3 lg:m-0 relative">
      {item.type === "link" ? (
        <>
          <Link
            to={item.href}
            className="p-2 before:absolute before:h-1 before:w-0 before:transition-all before:duration-500 before:bg-slate-600 before:-bottom-1 group-hover:before:w-full"
            href="#"
          >
            {item.name}
          </Link>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 justify-center items-center">
            <button
              className="relative flex gap-1 items-center"
              onClick={dropDownHandle}
            >
              <span>{item.name}</span>
              <FaChevronDown className="w-2 h-2" />
            </button>
            <div
              className={`${
                dropDown ? "block" : "hidden"
              } lg:hidden transition-all duration-500 pt-4 lg:bottom-0 lg:-left-5 w-max lg:absolute lg:transform lg:translate-y-full lg:group-hover:block`}
            >
              <ul className="flex flex-col overflow-hidden lg:shadow-lg rounded-lg bg-violet lg:bg-white dark:bg-base-200 text-center z-30 list-none">
                {dataTags.map((item, index) => (
                  <Link
                    to={`/articles/?tags=${item._id}`}
                    key={index}
                    className="px-4 py-2 hover:bg-violet hover:text-black  text-black lg:text-dark-soft border-b py-2"
                  >
                    <span className="">{item.title}</span>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
