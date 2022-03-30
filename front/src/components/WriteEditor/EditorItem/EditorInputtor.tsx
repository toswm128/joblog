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

  useEffect(() => {
    console.log("setText");
    // setText(data.text);
    data.id === WriteEditorState.focusLine && setFlag(!flag);
  }, [
    // WriteEditorState.body.length,
    // WriteEditorState.updatter,
    WriteEditorState.setTexter,
  ]);
  useEffect(() => {
    data.id === WriteEditorState.focusLine && setFlag(!flag);
    data.id === WriteEditorState.focusLine && console.log("flag");
  }, [WriteEditorState.setFocuser]);

  useEffect(() => {
    console.log("focus");
    if (data.id === WriteEditorState.focusLine && inputterRef.current) {
      inputterRef.current.setSelectionRange(9999, 9999);
      inputterRef.current.focus();
    }
  }, [flag]);

  return (
    <>
      {data.isImg === false ? (
        <ReactTextareaAutosize
          placeholder={
            data.id === WriteEditorState.focusLine ? "내용을 입력해 주세요" : ""
          }
          spellCheck={false}
          // cacheMeasurements
          style={drogOver ? { borderBottom: "5px solid #c4e3f0" } : {}}
          onKeyDown={e => {
            console.log(e.code);
            switch (e.code) {
              case "Space":
                if (inputterRef.current)
                  inputHook.setLineText(
                    text,
                    data.id,
                    inputterRef.current.selectionEnd
                  );
                break;
              case "ArrowUp":
                e.preventDefault();
                if (text !== data.text) inputHook.setLineText(text, data.id);
                if (inputterRef.current)
                  inputHook.focusPrevLine(
                    data.id,
                    inputterRef.current.selectionEnd
                  );
                break;
              // 시작 커맨드 뭐야 내가 수정할테니까 확인해봐
              case "ArrowDown":
                e.preventDefault();
                if (text !== data.text) inputHook.setLineText(text, data.id);
                if (inputterRef.current)
                  inputHook.focusNextLine(
                    data.id,
                    inputterRef.current.selectionEnd
                  );
                break;
              case "Tab":
                e.preventDefault();
                if (data.tag !== "ul") {
                  if (text !== data.text) inputHook.setLineText(text, data.id);
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
                    inputHook.setLineText(text, data.id);
                    inputHook.removeLineOnly(data.id, data.next, data.prev);
                  }
                }
                break;
              case "KeyZ":
                if (e.metaKey === true || e.ctrlKey === true) {
                  e.preventDefault();
                  if (e.shiftKey === true) {
                    inputHook.redo();
                  } else {
                    inputHook.undo();
                    console.log(
                      WriteEditorState.body,
                      WriteEditorState.trashList
                    );
                  }
                }
                break;
            }
          }}
          onDrop={e => {
            e.preventDefault();
            inputHook.setLineText(text, data.id);
            setDrogOver(false);
            if (e.dataTransfer.files[0] !== undefined) {
              inputHook.dropImg(
                data.id,
                URL.createObjectURL(e.dataTransfer.files[0])
              );
            } else if (e.dataTransfer.getData("url") !== undefined) {
              inputHook.dropImg(data.id, e.dataTransfer.getData("url"));
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
              if (text !== data.text) inputHook.setLineText(text, data.id);
              inputHook.setImg(
                data.id,
                URL.createObjectURL(e.clipboardData.files[0])
              );
            }
          }}
          // onKeyPress={e => {
          //   if (e.key === "Enter" && e.shiftKey === false) {
          //     if (text !== data.text) inputHook.setLineText(text, data.id);
          //     inputHook.enterInputter(data.id, data.next);
          //     e.preventDefault();
          //   }
          // }}
          onClick={() => {
            inputHook.clickInputter(data.id);
          }}
          onChange={e => {
            console.log(e);
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
            {data.src}
          </a>
        </>
      )}
    </>
  );
};

export default EditorInputter;
