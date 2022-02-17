import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "Store/rootReducer";
import { SET_LINE_TEXT } from "Store/WriteEditorStore/actions";

const useWrite = () => {
  const dispatch = useDispatch();
  const WriteEditorState = useTypedSelector(state => state.WriteEditor);
  const [text, setText] = useState<string | undefined>("");

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const setLineText = useCallback(
    (text: string | undefined) => {
      dispatch({
        type: SET_LINE_TEXT,
        payload: text,
      });
    },
    [dispatch]
  );

  return { text, changeText, setLineText, WriteEditorState };
};

export default useWrite;
