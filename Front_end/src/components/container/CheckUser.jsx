import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { updateCheckUser } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userActions } from "../../store/reducers/userReducers";

export const CheckUser = () => {
  // const [isValueCheck, setIsValueCheck] = useState(0);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  let valueCheck = userState?.userInfo?.check;
  // console.log(valueCheck);

  const { mutate: mutateUpdateCheck } = useMutation({
    mutationFn: ({ userId, check }) => {
      return updateCheckUser({
        userId,
        check,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Xin thành công");
      //       refetch();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handlerCheck = () => {
    mutateUpdateCheck({ userId: userState.userInfo?._id, check: 1 });
  };
  return (
    <div>
      {!userState?.userInfo?.admin && userState?.userInfo && (
        <button
          onClick={handlerCheck}
          disabled={valueCheck !== 0}
          className={`w-auto border border-purple-500 px-3 py-1 rounded-full hover:bg-purple-600 hover:text-violet hover:bg-opacity-30 ${
            valueCheck === 4 ? "hidden" : ""
          } `}
        >
          {valueCheck === 0
            ? "    Check để đăng bài"
            : valueCheck === 1
            ? "Đợi xác nhận"
            : "Bạn là thuyết giả"}
        </button>
      )}
    </div>
  );
};
