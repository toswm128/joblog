import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "Store/rootReducer";
import { FOCUS_LINE, SET_LINE_TEXT } from "Store/WriteEditorStore/actions";
import { line } from "Store/WriteEditorStore/type";

const useWrite = () => {
  const dispatch = useDispatch();
  const WriteEditorState = useTypedSelector(state => state.WriteEditor);
  const [text, setText] = useState<string | undefined>("");
  const [focus, setFocus] = useState<boolean>(false);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const setLineText = useCallback(
    (text: string | undefined, id: number) => {
      dispatch({
        type: SET_LINE_TEXT,
        payload: { text, id },
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
      console.log(WriteEditorState.body);
    },
    [dispatch]
  );

  return {
    focus,
    clickInputter,
    text,
    setText,
    changeText,
    setLineText,
    WriteEditorState,
  };
};

export default useWrite;
