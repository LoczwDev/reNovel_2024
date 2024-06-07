import React, { useState } from "react";
import { GrFavorite } from "react-icons/gr";

export const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tab-list border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap mb-7 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`tab me-2 ${index === activeTab ? "active " : ""}`}
              onClick={() => handleTabClick(index)}
            >
              <a
                href="#"
                className={`${index === activeTab ? "bg-purple-400 bg-opacity-40 border border-b-1 " : ""} text-lg inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group`}
              >
                {tab.icon}
                <span className="lg:block hidden ml-1">{tab.label}</span>
                
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">{tabs[activeTab].content}</div>
    </div>
  );
};
