import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { GET_BLOGS } from "Store/BlogStore/actions";
import { BlogStateType } from "Store/BlogStore/type";

const useBlog = () => {
  const dispatch = useDispatch();
  const getBlogs = useCallback(
    (blogs: BlogStateType) => {
      dispatch({
        type: GET_BLOGS,
        payload: blogs,
      });
    },
    [dispatch]
  );
  return { getBlogs };
};

export default useBlog;
