import WriteEditorState from "./state";
import produce from "immer";
import { FOCUS_LINE, SET_LINE_TEXT } from "./actions";
import { WriteEditorStateType } from "./type";
import { createReducer } from "typesafe-actions";

export default createReducer<WriteEditorStateType>(WriteEditorState, {
  [SET_LINE_TEXT]: (state, action) =>
    produce(state, draft => {
      draft.body[action.payload.id].text = action.payload.text;
    }),
  [FOCUS_LINE]: (state, action) =>
    produce(state, draft => {
      // 전체 포커스를 false지정
      draft.body.forEach(line => {
        line.isFocus = false;
      });
      // 이후 클릭한 line을 focus
      draft.body[action.payload].isFocus = true;
    }),
});
