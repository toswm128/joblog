import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { GET_BLOGS } from "Store/BlogStore/actions";
import { BlogStateType } from "Store/BlogStore/type";
import { useTypedSelector } from "Store/rootReducer";

const useBlog = () => {
  const dispatch = useDispatch();
  const blogs = useTypedSelector(state => state.Blog);
  const getBlogs = useCallback(
    (blogs: BlogStateType) => {
      dispatch({
        type: GET_BLOGS,
        payload: blogs,
      });
    },
    [dispatch]
  );
  return { blogs, getBlogs };
};

export default useBlog;
