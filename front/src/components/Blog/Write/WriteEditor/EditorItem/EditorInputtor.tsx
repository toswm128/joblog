import { css, jsx } from "@emotion/react";
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
  const [drogOver, setDrogOver] = useState(false);
  const inputHook = useWrite();
  const { WriteEditorState } = useWrite();
  const inputterRef = useRef<HTMLTextAreaElement>(null);
  const spaceFlag = useRef<boolean>(false);

  useEffect(() => {
    setText(data.text);
    data.id === WriteEditorState.focusLine && setFlag(!flag);
  }, [WriteEditorState.updatter]);
  useEffect(() => {
    data.id === WriteEditorState.focusLine && setFlag(!flag);
  }, [WriteEditorState.setFocuser]);

  useEffect(() => {
    if (data.id === WriteEditorState.focusLine && inputterRef.current) {
      inputterRef.current.setSelectionRange(9999, 9999);
      inputterRef.current.focus();
    }
  }, [flag]);

  return (
    <>
      <ReactTextareaAutosize
        placeholder={
          data.id === WriteEditorState.focusLine ? "내용을 입력해 주세요" : ""
        }
        spellCheck={false}
        // cacheMeasurements
        style={drogOver ? { borderBottom: "5px solid #c4e3f0" } : {}}
        onKeyDown={e => {
          switch (e.code) {
            case "Space":
              console.log(inputterRef.current);

              if (inputterRef.current) {
                inputHook.setLineText(
                  text,
                  data.id,
                  inputterRef.current.selectionEnd
                );
                spaceFlag.current = true;
              }
              break;
            case "ArrowUp":
              e.preventDefault();
              if (inputterRef.current && !e.nativeEvent.isComposing)
                inputHook.focusPrevLine(
                  data.id,
                  inputterRef.current.selectionEnd
                );
              break;
            case "ArrowDown":
              e.preventDefault();
              if (inputterRef.current && !e.nativeEvent.isComposing)
                inputHook.focusNextLine(
                  data.id,
                  inputterRef.current.selectionEnd
                );
              break;
            case "Tab":
              e.preventDefault();
              if (data.tag !== "ul") {
                inputterRef.current &&
                  inputHook.setTag2Ul(
                    data.id,
                    inputterRef.current.selectionEnd
                  );
              }
              break;
            case "Backspace":
              if (data.next !== null || WriteEditorState.head !== data.id) {
                if (text.length === 0)
                  inputHook.removeLine(data.id, data.next, data.prev);
                else if (
                  inputterRef.current &&
                  inputterRef.current.selectionEnd +
                    inputterRef.current.selectionStart ===
                    0
                ) {
                  inputHook.removeLineOnly(data.id, data.next, data.prev);
                } else {
                  spaceFlag.current && inputHook.setLineText(text, data.id);
                  spaceFlag.current = false;
                }
              }
              break;
            case "KeyZ":
              if (e.metaKey === true || e.ctrlKey === true) {
                if (!e.nativeEvent.isComposing) {
                  e.preventDefault();
                  if (e.shiftKey === true) {
                    inputHook.redo();
                  } else {
                    text !== data.text && inputHook.setLineText(text, data.id);
                    inputHook.undo();
                  }
                }
              }
              break;
          }
        }}
        onDrop={e => {
          e.preventDefault();
          setDrogOver(false);
          if (e.dataTransfer.files[0] !== undefined) {
            inputHook.dropImg(
              data.id,
              URL.createObjectURL(e.dataTransfer.files[0]),
              true
            );
          } else if (e.dataTransfer.getData("url") !== undefined) {
            console.log(e.dataTransfer.types);
            inputHook.dropImg(data.id, e.dataTransfer.getData("url"), true);
          }
        }}
        onDragOver={e => {
          setDrogOver(true);
        }}
        onDragLeave={e => {
          setDrogOver(false);
        }}
        className="content"
        value={text}
        ref={inputterRef}
        disabled={false}
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
    </>
  );
};

export default EditorInputter;
