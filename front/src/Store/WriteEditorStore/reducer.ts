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
  [ADD_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusLine = draft.body.length;
      draft.body.push({
        id: draft.body.length,
        text: "",
        tag: "div",
        next: action.payload.next,
      });
      draft.body.find(bodyData => {
        if (bodyData.id === action.payload.id)
          bodyData.next = draft.body.length - 1;
      });
    }),
});
