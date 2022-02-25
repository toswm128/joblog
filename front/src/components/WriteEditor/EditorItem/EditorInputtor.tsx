import useWrite from "hooks/write";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { line } from "Store/WriteEditorStore/type";

const EditorInputter = ({ data }: { data: line }) => {
  const [text, setText] = useState(data.text);
  const [flag, setFlag] = useState(false);
  const inputHook = useWrite();
  const inputterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(data.text);
    setFlag(!flag);
  }, [
    inputHook.WriteEditorState.body.length,
    inputHook.WriteEditorState.trashList,
  ]);

  useEffect(() => {
    if (
      data.id === inputHook.WriteEditorState.focusLine &&
      inputterRef.current
    ) {
      inputterRef.current.focus();
    }
  }, [flag]);

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
              inputHook.removeLine(data.id, data.next, data.prev);
          }
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            console.log("a");
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
