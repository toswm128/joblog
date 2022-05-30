import WriteEditorState from "./state";
import produce from "immer";
import {
  ADD_LINE,
  DROP_IMG,
  FOCUS_LINE,
  FOCUS_NEXT_LINE,
  FOCUS_PREV_LINE,
  REDO,
  REMOVE_LINE,
  REMOVE_LINE_ONLY,
  SET_BANNER,
  SET_IMG,
  SET_LINE_TEXT,
  SET_TAG_TO_UL,
  SET_TITLE,
  UNDO,
  UNSET_IMG,
} from "./actions";
import { WriteEditorStateType } from "./type";
import { createReducer } from "typesafe-actions";

export default createReducer<WriteEditorStateType>(WriteEditorState, {
  [SET_LINE_TEXT]: (state, action) =>
    produce(state, draft => {
      draft.body[action.payload.id].text = action.payload.text;
      draft.trashList.push({
        type: SET_LINE_TEXT,
        payload: {
          id: action.payload.id,
          text: draft.body[action.payload.id].text,
        },
      });
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
      });
      draft.body[action.payload.id].next = draft.body.length - 1;
      if (action.payload.next !== null)
        draft.body[action.payload.next].prev = draft.body.length - 1;
      draft.trashList.push({
        type: ADD_LINE,
        payload: {
          id: draft.body.length - 1,
          next: action.payload.next,
          prev: action.payload.id,
        },
      });
    }),
  [REMOVE_LINE]: (state, action) =>
    produce(state, draft => {
      draft.focusIndex = 9999;

      if (draft.head !== action.payload.id) {
        draft.body[action.payload.prev].next = action.payload.next;
        if (action.payload.next !== null)
          draft.body[action.payload.next].prev = action.payload.prev;
        draft.focusLine = action.payload.prev;
      } else {
        draft.head = action.payload.next;
        draft.focusLine = action.payload.next;
      }
      draft.setTexter = !draft.setTexter;
    }),
  [REMOVE_LINE_ONLY]: (state, action) =>
    produce(state, draft => {
      if (draft.head !== action.payload.id) {
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
      draft.body[action.payload.id].src = action.payload.src;
      if (draft.body[action.payload.id].next !== null)
        draft.focusLine = draft.body[action.payload.id].next;
      else draft.focusLine = draft.body[action.payload.id].prev;
    }),
  [UNSET_IMG]: (state, action) =>
    produce(state, draft => {
      draft.body[action.payload].tag = "div";
      draft.focusLine = action.payload;
    }),
  [DROP_IMG]: (state, action) =>
    produce(state, draft => {
      if (draft.body[action.payload.id].next !== null)
        draft.focusLine = draft.body[action.payload.id].next;
      else draft.focusLine = draft.body[action.payload.id].prev;

      draft.body.push({
        id: draft.body.length,
        text: "",
        tag: action.payload.isA ? "img" : "a",
        next: draft.body[action.payload.id].next,
        prev: action.payload.id,
        src: action.payload.src,
      });
      draft.body[action.payload.id].next = draft.body.length - 1;
      if (draft.body[action.payload.id].next !== null)
        draft.body[draft.body[action.payload.id].next!].prev =
          draft.body.length - 1;
    }),
  [SET_TAG_TO_UL]: (state, action) =>
    produce(state, draft => {
      draft.body[action.payload.id].tag = "ul";
      draft.focusIndex = action.payload.focusIndex;
    }),
  [FOCUS_NEXT_LINE]: (state, action) =>
    produce(state, draft => {
      draft.setFocuser = !draft.setFocuser;
      draft.focusLine = draft.body[action.payload.id].next;
      draft.focusIndex = action.payload.focusIndex;
    }),
  [FOCUS_PREV_LINE]: (state, action) =>
    produce(state, draft => {
      draft.setFocuser = !draft.setFocuser;
      draft.focusLine = draft.body[action.payload.id].prev;
      draft.focusIndex = action.payload.focusIndex;
    }),

  [UNDO]: state =>
    produce(state, draft => {
      draft.trashList.length &&
        draft.recycleList.push(draft.trashList[draft.trashList.length - 1]);
      const trash = draft.trashList.pop();
      switch (trash?.type) {
        case SET_LINE_TEXT:
          draft.body[trash.payload.id].text = trash.payload.text;
          draft.focusLine = trash.payload.id;
          break;
        case ADD_LINE:
          draft.body[trash.payload.prev].next = trash.payload.next;
          draft.body[trash.payload.next].prev = trash.payload.prev;
      }

      draft.updatter += 1;
    }),
  [REDO]: state =>
    produce(state, draft => {
      draft.recycleList.length &&
        draft.trashList.push(draft.recycleList[draft.recycleList.length - 1]);
      const recyclables = draft.recycleList.pop();
      switch (recyclables?.type) {
        case SET_LINE_TEXT:
          draft.body[recyclables.payload.id].text = recyclables.payload.text;
          draft.focusLine = recyclables.payload.id;
          break;
        case ADD_LINE:
          draft.body[recyclables.payload.prev].next = recyclables.payload.id;
          draft.body[recyclables.payload.next].prev = recyclables.payload.id;
      }

      draft.updatter += 1;
    }),
  [SET_BANNER]: (state, action) =>
    produce(state, draft => {
      draft.banner = action.payload;
    }),
  [SET_TITLE]: (state, action) =>
    produce(state, draft => {
      draft.title = action.payload;
    }),
});
