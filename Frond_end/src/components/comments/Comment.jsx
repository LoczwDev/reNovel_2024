import React from "react";
import { images, stable } from "../../constants";
import { LuMessageSquare } from "react-icons/lu";
import { VscEdit } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import CommentsContainer from "./CommentsContainer";
import CommentsForm from "./CommentsForm";

const Comment = ({
  comment,
  logginedUserId,
  affectComment,
  setAffectComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  getReply,

}) => {
  const isUserLogin = Boolean(logginedUserId);
  const checkToUser = logginedUserId === comment.user._id;
  const isReply =
    affectComment &&
    affectComment.type === "reply" &&
    affectComment._id === comment._id;
  const isEdit =
    affectComment &&
    affectComment.type === "edit" &&
    affectComment._id === comment._id;
  const replyCommentId = parentId ? parentId : comment._id;
  const replyUserId = comment.user._id;
  // console.log(comment, "comment");
  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#fff] dark:bg-base-100 lg:p-3 rounded-lg">
      <img
        src={
          comment?.user?.avatar
            ? stable.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
            : images.UserLogo
        }
        className={`w-10 h-10 object-cover rounded-full ${comment.user.avatar ? "" : "border-2 border-violet"}`}
        alt="userComment"
      />
      <div className="flex flex-1 flex-col">
        <h5 className="font-bold text-dark-hard dark:text-dark-light text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEdit && (
          <p className="font-montserrat text-sm mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}

        {isEdit && (
          <CommentsForm
            btnLabel="Sữa"
            formSubmitHanlder={(value) => updateComment(value, comment._id)}
            formCancel={() => setAffectComment(null)}
            contentComment={comment.desc}
          />
        )}
        <div className="flex items-center text-center gap-x-3 text-dark-light font-montserrat text-xs mt-3 mb-3">
          {isUserLogin && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectComment({ type: "reply", _id: comment._id })
              }
            >
              <LuMessageSquare className="w-4 h-auto" />
              <span>Trả lời</span>
            </button>
          )}
          {checkToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectComment({ type: "edit", _id: comment._id })
                }
              >
                <VscEdit className="w-4 h-auto" />
                <span>Chỉnh sữa</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <AiOutlineDelete className="w-4 h-auto" />
                <span>Xóa</span>
              </button>
            </>
          )}
        </div>
        {isReply && (
          <CommentsForm
            btnLabel="Reply"
            formSubmitHanlder={(value) =>
              addComment(value, replyCommentId, replyUserId)
            }
            formCancel={() => setAffectComment(null)}
          />
        )}
        {getReply.length > 0 && (
          <div>
            {getReply.map((reply) => {
              console.log(reply, "reply");
              return (
                <Comment
                  key={reply._id}
                  addComment={addComment}
                  affectComment={affectComment}
                  setAffectComment={setAffectComment}
                  comment={reply}
                  deleteComment={deleteComment}
                  logginedUserId={logginedUserId}
                  getReply={[]}
                  updateComment={updateComment}
                  parentId={comment._id}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
