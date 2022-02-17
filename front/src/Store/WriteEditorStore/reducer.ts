import WriteEditorState from "./state";
import produce from "immer";
import { SET_LINE_TEXT } from "./actions";
import { WriteEditorStateType } from "./type";
import { createReducer } from "typesafe-actions";

export default createReducer<WriteEditorStateType>(WriteEditorState, {
  [SET_LINE_TEXT]: (state, action) =>
    produce(state, draft => {
      draft.body = action.payload;
    }),
});
