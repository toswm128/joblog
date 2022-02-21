import useWrite from "hooks/write";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { line } from "Store/WriteEditorStore/type";
import { lineData } from "../WriteEditorType";

const EditorInputter = ({ data }: { data: line }) => {
  const inputHook = useWrite(data);
  const inpuuterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputHook.WriteEditorState.body[data.id].text !== inputHook.text)
      inputHook.setLineText();
    if (!inpuuterRef.current) {
      return;
    }
    inpuuterRef.current.focus();
  }, [inputHook.WriteEditorState.focusLine]);

  return (
    <>
      {data.isFocus ? (
        <input
          className="title"
          type="text"
          onChange={e => inputHook.changeText(e)}
          value={inputHook.text}
          ref={inpuuterRef}
        />
      ) : (
        <div
          className="title"
          onClick={() => {
            inputHook.clickInputter();
          }}
        >
          {inputHook.text}
        </div>
      )}
    </>
  );
};

export default EditorInputter;
