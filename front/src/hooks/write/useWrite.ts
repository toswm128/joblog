import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "Store/rootReducer";
import {
  ADD_LINE,
  FOCUS_LINE,
  REMOVE_LINE,
  SET_IMG,
  SET_LINE_TEXT,
  SET_TAG_TO_UL,
  UNSET_IMG,
} from "Store/WriteEditorStore/actions";
import { line } from "Store/WriteEditorStore/type";

const useWrite = () => {
  const dispatch = useDispatch();
  const WriteEditorState = useTypedSelector(state => state.WriteEditor);

  const setLineText = (text: string | undefined, id: number) => {
    dispatch({
      type: SET_LINE_TEXT,
      payload: { text, id },
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
    (id: number) => {
      dispatch({
        type: SET_TAG_TO_UL,
        payload: id,
      });
    },
    [dispatch]
  );

  return {
    clickInputter,
    enterInputter,
    setLineText,
    removeLine,
    setImg,
    unsetImg,
    setTag2Ul,
    WriteEditorState,
  };
};

export default useWrite;
