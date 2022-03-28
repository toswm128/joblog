import WriteEditorState from "./state";
import produce from "immer";
import {
  ADD_LINE,
  FOCUS_LINE,
  FOCUS_NEXT_LINE,
  FOCUS_PREV_LINE,
  REDO,
  REMOVE_LINE,
  REMOVE_LINE_ONLY,
  SET_IMG,
  SET_LINE_TEXT,
  SET_TAG_TO_UL,
  UNDO,
  UNSET_IMG,
} from "./actions";
import { WriteEditorStateType } from "./type";
import { createReducer } from "typesafe-actions";

export default createReducer<WriteEditorStateType>(WriteEditorState, {
  [SET_LINE_TEXT]: (state, action) =>
    produce(state, draft => {
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      if (draft.updatter !== 1) {
        draft.trashList.splice(
          draft.trashList.length - draft.updatter,
          draft.trashList.length - 1
        );
        draft.updatter = 1;
      }
      draft.body[action.payload.id].text = action.payload.text;
      draft.focusIndex = action.payload.index;
    }),
  [FOCUS_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusLine = action.payload;
    }),
  [ADD_LINE]: (state, action) =>
    produce(state, draft => {
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      if (draft.updatter !== 1) {
        draft.trashList.splice(
          draft.trashList.length - draft.updatter,
          draft.trashList.length - 1
        );
        draft.updatter = 1;
      }
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
      draft.focusIndex = 999999;
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      if (draft.updatter !== 1) {
        draft.trashList.splice(
          draft.trashList.length - draft.updatter,
          draft.trashList.length - 1
        );
        draft.updatter = 1;
      }
      if (draft.head !== action.payload.id) {
        draft.body[action.payload.prev].next = action.payload.next;
        if (action.payload.next !== null)
          draft.body[action.payload.next].prev = action.payload.prev;
        draft.focusLine = action.payload.prev;
      } else {
        draft.head = action.payload.next;
        draft.focusLine = action.payload.next;
      }
    }),
  [REMOVE_LINE_ONLY]: (state, action) =>
    produce(state, draft => {
      if (draft.head !== action.payload.id) {
        draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
        if (draft.updatter !== 1) {
          draft.trashList.splice(
            draft.trashList.length - draft.updatter,
            draft.trashList.length - 1
          );
          draft.updatter = 1;
        }
        draft.focusIndex = draft.body[action.payload.prev].text.length;
        draft.body[action.payload.prev].text +=
          draft.body[action.payload.id].text;
        draft.body[action.payload.prev].next = action.payload.next;
        if (action.payload.next !== null)
          draft.body[action.payload.next].prev = action.payload.prev;
        draft.focusLine = action.payload.prev;
      }
    }),

  [SET_IMG]: (state, action) =>
    produce(state, draft => {
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      if (draft.updatter !== 1) {
        draft.trashList.splice(
          draft.trashList.length - draft.updatter,
          draft.trashList.length - 1
        );
        draft.updatter = 1;
      }
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
      if (draft.updatter !== 1) {
        draft.trashList.splice(
          draft.trashList.length - draft.updatter,
          draft.trashList.length - 1
        );
        draft.updatter = 1;
      }
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      draft.body[action.payload].isImg = false;
      draft.focusLine = action.payload;
    }),
  [SET_TAG_TO_UL]: (state, action) =>
    produce(state, draft => {
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
      if (draft.updatter !== 1) {
        draft.trashList.splice(
          draft.trashList.length - draft.updatter,
          draft.trashList.length - 1
        );
        draft.updatter = 1;
      }
      draft.body[action.payload.id].tag = "ul";
      draft.focusIndex = action.payload.focusIndex;
    }),
  [FOCUS_NEXT_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusLine = draft.body[action.payload.id].next;
      draft.focusIndex = action.payload.focusIndex;
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
    }),
  [FOCUS_PREV_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusLine = draft.body[action.payload.id].prev;
      draft.focusIndex = action.payload.focusIndex;
      draft.trashList.push({ body: draft.body, focusLine: draft.focusLine });
    }),

  [UNDO]: (state, action) =>
    produce(state, draft => {
      if (draft.trashList.length >= draft.updatter) {
        draft.body =
          draft.trashList[draft.trashList.length - draft.updatter].body;
        draft.focusLine =
          draft.trashList[draft.trashList.length - draft.updatter].focusLine;
        draft.updatter += 1;
      }
    }),
  [REDO]: (state, action) =>
    produce(state, draft => {
      if (draft.updatter > 1) {
        draft.updatter -= 1;
        draft.body =
          draft.trashList[draft.trashList.length - draft.updatter].body;
        draft.focusLine =
          draft.trashList[draft.trashList.length - draft.updatter].focusLine;
      }
    }),
});
