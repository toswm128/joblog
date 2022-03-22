import useWrite from "hooks/write";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { configure, HotKeys } from "react-hotkeys";
import ReactTextareaAutosize from "react-textarea-autosize";
import { line } from "Store/WriteEditorStore/type";
import { keyMap } from "./hotkeys";

configure({ ignoreTags: ["input"], allowCombinationSubmatches: false });

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
    if (data.id === WriteEditorState.focusLine && inputterRef.current) {
      inputterRef.current.setSelectionRange(
        WriteEditorState.focusIndex,
        WriteEditorState.focusIndex
      );
      inputterRef.current.focus();
    }
  }, [flag]);

  const handlers = {
    UP: () => {
      console.log(text, data.text);
      if (text !== data.text) inputHook.setLineText(text, data.id);
      if (inputterRef.current)
        inputHook.focusPrevLine(data.id, inputterRef.current.selectionEnd);
    },
    DOWN: () => {
      if (text !== data.text) inputHook.setLineText(text, data.id);
      if (inputterRef.current)
        inputHook.focusNextLine(data.id, inputterRef.current.selectionEnd);
    },
    TAB: (e: any) => {
      e.preventDefault();
      if (data.tag !== "ul") {
        if (text !== data.text) inputHook.setLineText(text, data.id);
        inputterRef.current &&
          inputHook.setTag2Ul(data.id, inputterRef.current.selectionEnd);
      }
    },
    BACK: () => {
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
    },
    ENTER: (e: any) => {
      if (text !== data.text) inputHook.setLineText(text, data.id);
      inputHook.enterInputter(data.id, data.next);
      e.preventDefault();
    },
    shift: () => console.log("shift"),
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {data.isImg === false ? (
        <ReactTextareaAutosize
          spellCheck={false}
          cacheMeasurements
          onDrop={e => {
            e.preventDefault();
            console.log(e.dataTransfer.getData("url"));
            inputHook.setLineText(text, data.id);
            if (e.dataTransfer.files[0] !== undefined) {
              inputHook.setImg(
                data.id,
                URL.createObjectURL(e.dataTransfer.files[0])
              );
            } else if (e.dataTransfer.getData("url") !== undefined) {
              inputHook.setImg(data.id, e.dataTransfer.getData("url"));
            }
          }}
          className="title"
          value={text}
          ref={inputterRef}
          disabled={false}
          onPaste={e => {
            if (e.clipboardData.files[0] !== undefined) {
              if (text !== data.text) inputHook.setLineText(text, data.id);
              inputHook.setImg(
                data.id,
                URL.createObjectURL(e.clipboardData.files[0])
              );
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
        <>
          <img
            src={data.src}
            alt=""
            onError={() => {
              console.log("error");
            }}
            onClick={() => inputHook.unsetImg(data.id)}
          />
          <a target="_blank" href={data.src}>
            하이퍼
          </a>
        </>
      )}
    </HotKeys>
  );
};

export default EditorInputter;
