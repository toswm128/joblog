import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "Store/rootReducer";
import { FOCUS_LINE, SET_LINE_TEXT } from "Store/WriteEditorStore/actions";
import { line } from "Store/WriteEditorStore/type";

const useWrite = (data?: line) => {
  const dispatch = useDispatch();
  const WriteEditorState = useTypedSelector(state => state.WriteEditor);
  const [text, setText] = useState<string | undefined>(data && data.text);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const setLineText = () => {
    dispatch({
      type: SET_LINE_TEXT,
      payload: { text: text, id: data && data.id },
    });
  };

  const clickInputter = useCallback(() => {
    dispatch({
      type: FOCUS_LINE,
      payload: data && data.id,
    });
  }, [dispatch]);

  return {
    clickInputter,
    text,
    setText,
    changeText,
    setLineText,
    WriteEditorState,
  };
};

export default useWrite;
