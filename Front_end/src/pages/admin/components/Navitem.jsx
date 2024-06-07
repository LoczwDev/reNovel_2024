import React from "react";
import { NavLink } from "react-router-dom";

const Navitem = ({title, icon, name, link, navName, setNavName}) => {
  // console.log(name, navName ,"tye");
  return (
    <NavLink
      to={link}
      className={`${
        name === navName
          ? "font-bold text-violet"
          : "font-semibold text-gray-500"
      } flex items-center gap-x-2 text-lg mt-3`}
      onClick={() => setNavName(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default Navitem;
