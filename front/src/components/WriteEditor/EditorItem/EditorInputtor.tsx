import useWrite from "hooks/write";
import React from "react";
import { useEffect } from "react";
import { lineData } from "../WriteEditorType";

const EditorInputter = ({ data }: { data: lineData }) => {
  const inputText = useWrite();

  useEffect(() => {
    inputText.setText(data.text);
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      {data.isFocus ? (
        <input
          className="title"
          type="text"
          onChange={e => inputText.changeText(e)}
          value={inputText.text}
        />
      ) : (
        <div className="title" onClick={() => inputText.clickInputter(data.id)}>
          {inputText.text}
        </div>
      )}
    </>
  );
};

export default EditorInputter;
