import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "Store/rootReducer";
import {
  ADD_LINE,
  FOCUS_LINE,
  REMOVE_LINE,
  SET_LINE_TEXT,
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

  return {
    clickInputter,
    enterInputter,
    setLineText,
    removeLine,
    WriteEditorState,
  };
};

export default useWrite;
