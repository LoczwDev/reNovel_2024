import React from "react";

export const LoadingCard = ({ className }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ${className} animate-pulse`}
    >
      {/* imagie */}
      <div className="w-full aspect-video bg-slate-300 " />

      <div className="p-5">
        {/* title */}
        <div className="w-56 h-2 mt-4 bg-slate-300 rounded-lg" />
        {/* caption */}
        <div className="w-24 h-2 mt-4 bg-slate-300 rounded-lg" />

        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2">
            {/* avatar */}
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-300 " />
            <div className="flex flex-col">
              {/* nameUser */}
              <div className="w-24 h-2 bg-slate-300 rounded-lg" />
              {/* verified status */}
              <div className="w-16 h-2 mt-2 bg-slate-300 rounded-lg" />
            </div>
          </div>
          {/* date */}
          <div className="w-10 h-2 mt-4 bg-slate-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
