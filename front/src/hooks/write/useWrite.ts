import { useCallback } from "react";
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
  DROP_IMG,
  SET_BANNER,
  SET_TITLE,
  RESET,
  OPEN_TAG_BOX,
} from "Store/WriteEditorStore/actions";

const useWrite = () => {
  const dispatch = useDispatch();
  const WriteEditorState = useTypedSelector((state) => state.WriteEditor);

  const setLineText = useCallback(
    (text: string | undefined, id: number, index?: number) => {
      dispatch({
        type: SET_LINE_TEXT,
        payload: { text, id, index },
      });
    },
    [dispatch]
  );

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

  const dropImg = useCallback(
    (id: number, src: string, isA?: boolean) => {
      dispatch({
        type: DROP_IMG,
        payload: { id, src, isA },
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

  const setBanner = useCallback(
    (file: File) => {
      dispatch({
        type: SET_BANNER,
        payload: file,
      });
    },
    [dispatch]
  );
  const setTitle = useCallback(
    (text: string) => {
      dispatch({
        type: SET_TITLE,
        payload: text,
      });
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch({
      type: RESET,
    });
  }, [dispatch]);

  const openTagBox = useCallback(() => {
    dispatch({
      type: OPEN_TAG_BOX,
    });
  }, [dispatch]);

  return {
    clickInputter,
    enterInputter,
    setLineText,
    removeLine,
    removeLineOnly,
    setImg,
    dropImg,
    unsetImg,
    setTag2Ul,
    focusNextLine,
    focusPrevLine,
    undo,
    redo,
    setBanner,
    setTitle,
    reset,
    openTagBox,
    WriteEditorState,
  };
};

export default useWrite;
