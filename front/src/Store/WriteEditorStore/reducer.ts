import WriteEditorState from "./state";
import produce from "immer";
import { ADD_LINE, FOCUS_LINE, SET_LINE_TEXT } from "./actions";
import { WriteEditorStateType } from "./type";
import { createReducer } from "typesafe-actions";

export default createReducer<WriteEditorStateType>(WriteEditorState, {
  [SET_LINE_TEXT]: (state, action) =>
    produce(state, draft => {
      draft.body[action.payload.id].text = action.payload.text;
    }),
  [FOCUS_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusLine = action.payload;
    }),
  // [ADD_LINE]:(state,action) =>
  // produce(state,draft=>{
  //   draft.body
  // })
});
