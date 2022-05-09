import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "Store/rootReducer";
import { SET_USER } from "Store/UserStore/action";
import { UserStateType } from "Store/UserStore/type";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useTypedSelector(state => state.User);

  const setUser = useCallback(
    ({ userId, name, profile }: UserStateType) => {
      dispatch({
        type: SET_USER,
        payload: { userId, name, profile },
      });
    },
    [dispatch]
  );
  return {
    setUser,
    user,
  };
};

export default useUser;
