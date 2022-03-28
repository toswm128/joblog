import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "Store/rootReducer";
import {
  ADD_LINE,
  UNDO,
  FOCUS_LINE,
  FOCUS_NEXT_LINE,
  FOCUS_PREV_LINE,
  REMOVE_LINE,
  REMOVE_LINE_ONLY,
  SET_IMG,
  SET_LINE_TEXT,
  SET_TAG_TO_UL,
  UNSET_IMG,
  REDO,
} from "Store/WriteEditorStore/actions";

const useWrite = () => {
  const dispatch = useDispatch();
  const WriteEditorState = useTypedSelector(state => state.WriteEditor);

  const setLineText = (
    text: string | undefined,
    id: number,
    index?: number
  ) => {
    dispatch({
      type: SET_LINE_TEXT,
      payload: { text, id, index },
    });
  };

  const clickInputter = useCallback(
    (id: number) => {
      dispatch({
        type: FOCUS_LINE,
        payload: id,
      });
    },
    [dispatch]
  );

  const enterInputter = useCallback(
    (id: number, next: number | null) => {
      dispatch({
        type: ADD_LINE,
        payload: { id, next },
      });
    },
    [dispatch]
  );

  const removeLine = useCallback(
    (id: number, next: number | null, prev: number | null) => {
      dispatch({
        type: REMOVE_LINE,
        payload: { id, next, prev },
      });
    },
    [dispatch]
  );

  const removeLineOnly = useCallback(
    (id: number, next: number | null, prev: number | null) => {
      dispatch({
        type: REMOVE_LINE_ONLY,
        payload: { id, next, prev },
      });
    },
    [dispatch]
  );

  const setImg = useCallback(
    (id: number, src: string) => {
      dispatch({
        type: SET_IMG,
        payload: { id, src },
      });
    },
    [dispatch]
  );
  const unsetImg = useCallback(
    (id: number) => {
      dispatch({
        type: UNSET_IMG,
        payload: id,
      });
    },
    [dispatch]
  );

  const setTag2Ul = useCallback(
    (id: number, focusIndex: number) => {
      dispatch({
        type: SET_TAG_TO_UL,
        payload: { id, focusIndex },
      });
    },
    [dispatch]
  );

  const focusNextLine = useCallback(
    (id: number, focusIndex: number) => {
      dispatch({
        type: FOCUS_NEXT_LINE,
        payload: { id, focusIndex },
      });
    },
    [dispatch]
  );
  const focusPrevLine = useCallback(
    (id: number, focusIndex: number) => {
      dispatch({
        type: FOCUS_PREV_LINE,
        payload: { id, focusIndex },
      });
    },
    [dispatch]
  );

  const undo = useCallback(() => {
    dispatch({
      type: UNDO,
    });
  }, [dispatch]);
  const redo = useCallback(() => {
    dispatch({
      type: REDO,
    });
  }, [dispatch]);

  return {
    clickInputter,
    enterInputter,
    setLineText,
    removeLine,
    removeLineOnly,
    setImg,
    unsetImg,
    setTag2Ul,
    focusNextLine,
    focusPrevLine,
    undo,
    redo,
    WriteEditorState,
  };
};

export default useWrite;
