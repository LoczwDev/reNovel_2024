import React, { useState, useEffect } from "react";

import CommentsForm from "./CommentsForm";
import { getCommentsData } from "../../data/comments";
import Comment from "./Comment";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../services/index/comment";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  slugPost,
  refetch,
}) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [affectComment, setAffectComment] = useState(null);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        refetch();
        toast.success("Comment thành công");
      },
      onError: (error) => {
        toast.error(error);
        console.log(error);
      },
    });

  const { mutate: mutateUpdateComment, isLoading: isLoadingUpdateComment } =
    useMutation({
      mutationFn: ({ token, desc, commentId }) => {
        return updateComment({ token, desc, commentId });
      },
      onSuccess: () => {
        toast.success("Update comment thành công");
        queryClient.invalidateQueries(["blog", slugPost]);
      },

      onError: (error) => {
        toast.error(error);
        console.log(error);
      },
    });

  const { mutate: mutateDeleteComment, isLoading: isLoadingDeleteComment } =
    useMutation({
      mutationFn: ({ token, commentId }) => {
        return deleteComment({ token, commentId });
      },
      onSuccess: () => {
        toast.success("Xóa comment thành công");
        queryClient.invalidateQueries(["blog", slugPost]);
      },

      onError: (error) => {
        toast.error(error);
        console.log(error);
      },
    });
  // console.log(comments, "comments");

  const addCommentHanlder = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: slugPost,
    });
    setAffectComment(null);
    refetch();
    // window.location.reload();
  };

  const updateCommentHanlder = (value, commentId) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId,
    });
    setAffectComment(null);
  };

  const deleteCommentHanlder = (commentId) => {
    mutateDeleteComment({ token: userState.userInfo.token, commentId });
  };

  return (
    <div className={`${className} `}>
      {userState?.userInfo ? (
        <CommentsForm
          btnLabel="Gửi"
          loading={isLoadingNewComment}
          formSubmitHanlder={(value) => addCommentHanlder(value)}
        />
      ) : (
        ""
      )}

      <div className="space-y-4 mt-8">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            logginedUserId={logginedUserId}
            affectComment={affectComment}
            setAffectComment={setAffectComment}
            addComment={addCommentHanlder}
            updateComment={updateCommentHanlder}
            deleteComment={deleteCommentHanlder}
            getReply={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
