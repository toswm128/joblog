import useWrite from "hooks/write";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { line } from "Store/WriteEditorStore/type";

const EditorInputter = ({ data }: { data: line }) => {
  const [text, setText] = useState(data.text);
  const [flag, setFlag] = useState(false);
  const [src, setSrc] = useState("");
  const inputHook = useWrite();
  const inputterRef = useRef<HTMLTextAreaElement>(null);

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
      {data.isImg === false ? (
        <ReactTextareaAutosize
          cacheMeasurements
          onDrop={e => {
            e.preventDefault();
            if (e.dataTransfer.files[0] !== undefined) {
              inputHook.setImg(
                data.id,
                URL.createObjectURL(e.dataTransfer.files[0])
              );
            }
          }}
          className="title"
          value={text}
          ref={inputterRef}
          disabled={false}
          onKeyDown={e => {
            if (e.key === "Tab") {
              e.preventDefault();
              data.tag !== "ul" && inputHook.setTag2Ul(data.id);
            }
            if (e.key === "Backspace" && text.length === 0) {
              if (
                data.next !== null ||
                inputHook.WriteEditorState.head !== data.id
              )
                inputHook.removeLine(data.id, data.next, data.prev);
            }
          }}
          onPaste={e => {
            if (e.clipboardData.files[0] !== undefined) {
              inputHook.setImg(
                data.id,
                URL.createObjectURL(e.clipboardData.files[0])
              );
            }
          }}
          onKeyPress={e => {
            if (e.key === "Enter" && e.shiftKey === false) {
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
            if (text !== data.text) inputHook.setLineText(text, data.id);
          }}
        />
      ) : (
        <img
          src={data.src}
          alt=""
          onClick={() => inputHook.unsetImg(data.id)}
        />
      )}
    </>
  );
};

export default EditorInputter;
