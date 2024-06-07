import React from "react";
import AsyncSelect from "react-select/async";

export const SelectMultiple = ({
  defaultValue = [],
  loadOptions,
  onchange,
}) => {
  return (
    <AsyncSelect
      defaultValue={defaultValue}
      defaultOptions
      isMulti
      placeholder={"Chọn thể loại"}
      loadOptions={loadOptions}
      onChange={onchange}
      className="relative z-20 px-4 py-2 rounded-lg outline-none w-full dark:bg-base-100 dark:text-dark-light"
    />
  );
};
