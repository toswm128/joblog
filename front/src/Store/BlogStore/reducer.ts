import produce from "immer";
import { createReducer } from "typesafe-actions";
import { GET_BLOGS } from "./actions";
import BlogState from "./state";
import { BlogStateType } from "./type";

export default createReducer<BlogStateType>(BlogState, {
  [GET_BLOGS]: (state, action) =>
    produce(state, draft => {
      draft.blogList = [...draft.blogList, ...action.payload];
      console.log(...action.payload);
    }),
});
