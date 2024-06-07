import React from "react";
import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaRedditSquare,
} from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
// import {  } from "react-icons/fa";
// import {  } from "react-icons/fa";
const ShareButton = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between ">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=817756507050366&display=popup&href=${url}/`}
      >
        <FaFacebookSquare className="text-blue-800 w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaSquareTwitter className="text-[#00acee] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`http://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaRedditSquare className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default ShareButton;
