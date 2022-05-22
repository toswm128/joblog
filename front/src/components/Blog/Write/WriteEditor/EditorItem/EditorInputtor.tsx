import useWrite from "hooks/write";
import React, { useCallback, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { line } from "Store/WriteEditorStore/type";

const EditorInputter = ({ data }: { data: line }) => {
  const [text, setText] = useState(data.text);
  const [flag, setFlag] = useState(false);
  const [drogOver, setDrogOver] = useState(false);
  const {
    setLineText,
    focusNextLine,
    focusPrevLine,
    setTag2Ul,
    removeLine,
    removeLineOnly,
    redo,
    undo,
    dropImg,
    setImg,
    enterInputter,
    clickInputter,
    WriteEditorState,
  } = useWrite();
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
  }, [flag, data.id]);

  const onKeyPressEnter = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && e.shiftKey === false) {
        setLineText(text, data.id);
        enterInputter(data.id, data.next);
        e.preventDefault();
      }
    },
    [data.id, data.next, enterInputter, setLineText, text]
  );

  const onKeyDownArrowUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      if (inputterRef.current && !e.nativeEvent.isComposing)
        focusPrevLine(data.id, inputterRef.current.selectionEnd);
    },
    [data.id, focusPrevLine]
  );

  const onKeyDownArrowDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      if (inputterRef.current && !e.nativeEvent.isComposing)
        focusNextLine(data.id, inputterRef.current.selectionEnd);
    },
    [data.id, focusNextLine]
  );

  const onKeyDownSpace = useCallback(() => {
    if (inputterRef.current) {
      setLineText(text, data.id, inputterRef.current.selectionEnd);
      spaceFlag.current = true;
    }
  }, [data.id, setLineText, text]);

  const onKeyDownTab = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      if (data.tag !== "ul") {
        inputterRef.current &&
          setTag2Ul(data.id, inputterRef.current.selectionEnd);
      }
    },
    [data.id, data.tag, setTag2Ul]
  );

  const onKeyDownBackspace = useCallback(() => {
    if (data.next !== null || WriteEditorState.head !== data.id) {
      if (text.length === 0) removeLine(data.id, data.next, data.prev);
      else if (
        inputterRef.current &&
        inputterRef.current.selectionEnd +
          inputterRef.current.selectionStart ===
          0
      ) {
        removeLineOnly(data.id, data.next, data.prev);
      } else {
        spaceFlag.current && setLineText(text, data.id);
        spaceFlag.current = false;
      }
    }
  }, [
    data.id,
    data.next,
    data.prev,
    removeLine,
    removeLineOnly,
    setLineText,
    WriteEditorState.head,
    text,
  ]);

  const onKeyDownZ = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.metaKey === true || e.ctrlKey === true) {
        if (!e.nativeEvent.isComposing) {
          e.preventDefault();
          if (e.shiftKey === true) {
            redo();
          } else {
            text !== data.text && setLineText(text, data.id);
            undo();
          }
        }
      }
    },
    [data.text, data.id, redo, undo, text, setLineText]
  );

  const onDropUrl = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      setDrogOver(false);
      if (e.dataTransfer.files[0] !== undefined) {
        dropImg(data.id, URL.createObjectURL(e.dataTransfer.files[0]), true);
      } else if (e.dataTransfer.getData("url") !== undefined) {
        console.log(e.dataTransfer.types);
        dropImg(data.id, e.dataTransfer.getData("url"), true);
      }
    },
    [data.id, dropImg]
  );

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
              onKeyDownSpace();
              break;
            case "ArrowUp":
              onKeyDownArrowUp(e);
              break;
            case "ArrowDown":
              onKeyDownArrowDown(e);
              break;
            case "Tab":
              onKeyDownTab(e);
              break;
            case "Backspace":
              onKeyDownBackspace();
              break;
            case "KeyZ":
              onKeyDownZ(e);
              break;
          }
        }}
        onDrop={e => {
          onDropUrl(e);
        }}
        onDragOver={() => {
          setDrogOver(true);
        }}
        onDragLeave={() => {
          setDrogOver(false);
        }}
        className="content"
        value={text}
        ref={inputterRef}
        disabled={false}
        onPaste={e => {
          e.clipboardData.files[0] &&
            setImg(data.id, URL.createObjectURL(e.clipboardData.files[0]));
        }}
        onKeyPress={e => {
          onKeyPressEnter(e);
        }}
        onClick={() => {
          clickInputter(data.id);
        }}
        onChange={e => {
          setText(e.target.value);
        }}
        onBlur={() => {
          if (text !== data.text) setLineText(text, data.id);
        }}
      />
    </>
  );
};

export default EditorInputter;
