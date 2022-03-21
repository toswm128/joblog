import WriteEditorState from "./state";
import produce from "immer";
import {
  ADD_LINE,
  FOCUS_LINE,
  FOCUS_NEXT_LINE,
  FOCUS_PREV_LINE,
  REMOVE_LINE,
  REMOVE_LINE_ONLY,
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
      draft.focusIndex = action.payload.index;
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
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
    }),
  [REMOVE_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusIndex = 999999;
      if (draft.head !== action.payload.id) {
        draft.body[action.payload.prev].next = action.payload.next;
        if (action.payload.next !== null)
          draft.body[action.payload.next].prev = action.payload.prev;
        draft.focusLine = action.payload.prev;
        draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      } else {
        draft.head = action.payload.next;
        draft.focusLine = action.payload.next;
        draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      }
    }),
  [REMOVE_LINE_ONLY]: (state, action) =>
    produce(state, draft => {
      if (draft.head !== action.payload.id) {
        draft.focusIndex = draft.body[action.payload.prev].text.length;
        draft.body[action.payload.prev].text +=
          draft.body[action.payload.id].text;
        draft.body[action.payload.prev].next = action.payload.next;
        if (action.payload.next !== null)
          draft.body[action.payload.next].prev = action.payload.prev;
        draft.focusLine = action.payload.prev;
        draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      }
    }),

  [SET_IMG]: (state, action) =>
    produce(state, draft => {
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      draft.body[action.payload.id].isImg = true;
      draft.body[action.payload.id].src = action.payload.src;
      if (draft.body[action.payload.id].next !== null)
        draft.focusLine = draft.body[action.payload.id].next;
      else draft.focusLine = draft.body[action.payload.id].prev;
    }),
  [UNSET_IMG]: (state, action) =>
    produce(state, draft => {
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      draft.body[action.payload].isImg = false;
      draft.focusLine = action.payload;
    }),
  [SET_TAG_TO_UL]: (state, action) =>
    produce(state, draft => {
      draft.body[action.payload.id].tag = "ul";
      draft.focusIndex = action.payload.focusIndex;
    }),
  [FOCUS_NEXT_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusLine = draft.body[action.payload.id].next;
      draft.focusIndex = action.payload.focusIndex;
      draft.trashList.push({ focusLine: draft.focusLine });
    }),
  [FOCUS_PREV_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusLine = draft.body[action.payload.id].prev;
      draft.focusIndex = action.payload.focusIndex;
      draft.trashList.push({ focusLine: draft.focusLine });
    }),
});
