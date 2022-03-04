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
  const { WriteEditorState } = useWrite();
  const inputterRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(data.text);
    data.id === WriteEditorState.focusLine && setFlag(!flag);
  }, [WriteEditorState.body.length, WriteEditorState.trashList]);

  useEffect(() => {
    console.log(WriteEditorState.focusIndex);
    if (data.id === WriteEditorState.focusLine && inputterRef.current) {
      inputterRef.current.setSelectionRange(
        WriteEditorState.focusIndex,
        WriteEditorState.focusIndex
      );
      inputterRef.current.focus();
    }
  }, [flag]);

  return (
    <>
      {data.isImg === false ? (
        <ReactTextareaAutosize
          spellCheck={false}
          cacheMeasurements
          onDrop={e => {
            e.preventDefault();
            inputHook.setLineText(text, data.id);
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
            if (e.key === "ArrowUp") {
              if (text !== data.text) inputHook.setLineText(text, data.id);
              if (inputterRef.current)
                inputHook.focusPrevLine(
                  data.id,
                  inputterRef.current.selectionEnd
                );
            }
            if (e.key === "ArrowDown") {
              if (text !== data.text) inputHook.setLineText(text, data.id);
              if (inputterRef.current)
                inputHook.focusNextLine(
                  data.id,
                  inputterRef.current.selectionEnd
                );
            }
            if (e.key === "Tab") {
              e.preventDefault();
              if (data.tag !== "ul") {
                if (text !== data.text) inputHook.setLineText(text, data.id);
                inputterRef.current &&
                  inputHook.setTag2Ul(
                    data.id,
                    inputterRef.current.selectionEnd
                  );
              }
            }
            if (e.key === "Backspace") {
              if (data.next !== null || WriteEditorState.head !== data.id) {
                if (
                  inputterRef.current &&
                  inputterRef.current.selectionEnd +
                    inputterRef.current.selectionStart ===
                    0
                ) {
                  inputHook.removeLineOnly(data.id, data.next, data.prev);
                }
                if (text.length === 0)
                  inputHook.removeLine(data.id, data.next, data.prev);
              }
            }
          }}
          onPaste={e => {
            if (e.clipboardData.files[0] !== undefined) {
              if (text !== data.text) inputHook.setLineText(text, data.id);
              inputHook.setImg(
                data.id,
                URL.createObjectURL(e.clipboardData.files[0])
              );
            }
          }}
          onKeyPress={e => {
            if (e.key === "Enter" && e.shiftKey === false) {
              if (text !== data.text) inputHook.setLineText(text, data.id);
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
