import useWrite from "hooks/write";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { line } from "Store/WriteEditorStore/type";

const EditorInputter = ({ data }: { data: line }) => {
  const [text, setText] = useState(data.text);
  const inputHook = useWrite();
  const inputterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(data.text);
    if (data.id === inputHook.WriteEditorState.focusLine && inputterRef.current)
      inputterRef.current.focus();
  }, [
    inputHook.WriteEditorState.body.length,
    inputHook.WriteEditorState.trashList,
  ]);

  return (
    <>
      <input
        className="title"
        value={text}
        ref={inputterRef}
        disabled={false}
        onKeyDown={e => {
          if (e.key === "Backspace" && text.length === 0) {
            if (
              data.next !== null ||
              inputHook.WriteEditorState.head !== data.id
            )
              inputHook.removeLine(data.id, data.next);
          }
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            inputHook.setLineText(text, data.id);
            inputHook.enterInputter(data.id, data.next);
            e.preventDefault();
          }
        }}
        onClick={() => {
          inputHook.clickInputter(data.id);
        }}
        onChange={e => {
          setText(e.target.value);
        }}
        onBlur={() => {
          inputHook.setLineText(text, data.id);
        }}
      />
    </>
  );
};

export default EditorInputter;
