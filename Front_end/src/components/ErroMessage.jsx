import React from "react";

const ErroMessage = ({ message }) => {
  return (
    <div className="w-full p-2 rounded-lg bg-red-500 mx-auto text-center text-black">
      <p>{message}</p>
    </div>
  );
};

export default ErroMessage;
