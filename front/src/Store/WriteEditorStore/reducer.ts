import WriteEditorState from "./state";
import produce from "immer";
import {
  ADD_LINE,
  FOCUS_LINE,
  REMOVE_LINE,
  SET_IMG,
  SET_LINE_TEXT,
  SET_TAG_TO_UL,
  UNSET_IMG,
} from "./actions";
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
        prev: action.payload.id,
        src: "",
        isImg: false,
      });
      draft.body[action.payload.id].next = draft.body.length - 1;
      if (action.payload.next !== null)
        draft.body[action.payload.next].prev = draft.body.length - 1;
    }),
  [REMOVE_LINE]: (state, action) =>
    produce(state, draft => {
      if (draft.head !== action.payload.id) {
        draft.body[action.payload.prev].next = action.payload.next;
        if (action.payload.next !== null)
          draft.body[action.payload.next].prev = action.payload.prev;
        draft.trashList.push(draft.body[action.payload.id]);
        draft.focusLine = action.payload.prev;
      } else {
        draft.head = action.payload.next;
        draft.trashList.push(draft.body[action.payload.id]);

        draft.focusLine = action.payload.next;
      }
    }),
  [SET_IMG]: (state, action) =>
    produce(state, draft => {
      draft.trashList.push(draft.body[action.payload.id]);
      draft.body[action.payload.id].isImg = true;
      draft.body[action.payload.id].src = action.payload.src;
      if (draft.body[action.payload.id].next !== null)
        draft.focusLine = draft.body[action.payload.id].next;
      else draft.focusLine = draft.body[action.payload.id].prev;
    }),
  [UNSET_IMG]: (state, action) =>
    produce(state, draft => {
      draft.trashList.push(draft.body[action.payload]);
      draft.body[action.payload].isImg = false;
      draft.focusLine = action.payload;
    }),
  [SET_TAG_TO_UL]: (state, action) =>
    produce(state, draft => {
      draft.body[action.payload].tag = "ul";
    }),
});
