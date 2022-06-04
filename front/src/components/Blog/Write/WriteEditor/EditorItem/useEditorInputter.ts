import useWrite from "hooks/write";
import React, { ReactEventHandler, useCallback, useRef, useState } from "react";
import { line } from "Store/WriteEditorStore/type";

const useEditorInputter = (data: line) => {
  const [text, setText] = useState(data.text);
  const [drogOver, setDrogOver] = useState(false);

  const inputterRef = useRef<HTMLTextAreaElement>(null);
  const spaceFlag = useRef<boolean>(false);

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

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

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

  const onBlur = useCallback(() => {
    if (text !== data.text) setLineText(text, data.id);
  }, [data.text, data.id, text]);

  const dragOver = useCallback(() => {
    setDrogOver(true);
  }, []);

  const dragLeave = useCallback(() => {
    setDrogOver(false);
  }, []);

  const onPasteImg = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.clipboardData.files[0] &&
        setImg(data.id, URL.createObjectURL(e.clipboardData.files[0]));
    },
    [data.id]
  );

  const click = useCallback(() => {
    clickInputter(data.id);
  }, [data.id]);

  return {
    onChangeText,
    onKeyPressEnter,
    onKeyDownArrowUp,
    onKeyDownArrowDown,
    onKeyDownSpace,
    onKeyDownTab,
    onKeyDownBackspace,
    onKeyDownZ,
    onDropUrl,
    onBlur,
    dragOver,
    dragLeave,
    onPasteImg,
    click,
    inputterRef,
    text,
    drogOver,
  };
};

export default useEditorInputter;
