import React, { Children, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavitemCollap = ({
  title,
  children,
  content,
  icon,
  name,
  navName,
  setNavName,
}) => {
  const [isChecked, setIsChecked] = useState(name === navName);

  const handleCheckboxChange = () => {
    const updatedNavName = isChecked ? null : name;
    setNavName(updatedNavName);
  };

  useEffect(() => {
    setIsChecked(name === navName);
  }, [name, navName]);

  return (
    <div className="collapse collapse-arrow">
      <input
        type="checkbox"
        className="py-0"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div
        className={`collapse-title text-lg font-medium min-h-0 py-0 pl-0  flex items-center gap-x-2 ${
          isChecked ? "font-bold text-primary" : "font-semibold text-gray-500"
        }`}
      >
        {icon}
        {title}
      </div>
      <div className="collapse-content">
        <div className="mt-2 flex flex-col gap-y-2">{children}</div>
      </div>
    </div>
  );
};

export default NavitemCollap;
