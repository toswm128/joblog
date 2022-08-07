import useBlogAPI from "assets/API/useBlogAPI";
import useWrite from "hooks/write";
import React, { useCallback, useRef, useState } from "react";
import { useMutation } from "react-query";
import { line } from "Store/WriteEditorStore/type";

const useEditorInputter = (data: line) => {
  const [text, setText] = useState(data.text);
  const [drogOver, setDrogOver] = useState(false);

  const inputterRef = useRef<HTMLTextAreaElement>(null);
  const spaceFlag = useRef<boolean>(false);
  const { postImg } = useBlogAPI();
  const { mutate } = useMutation(postImg, {
    onSuccess: (img) => dropImg(data.id, img.data, true),
  });

  const {
    setLineText,
    focusNextLine,
    focusPrevLine,
    setTag2Ul,
    removeLine,
    removeLineOnly,
    setTag2A,
    redo,
    undo,
    dropImg,
    setImg,
    enterInputter,
    clickInputter,
    openTagBox,
    closeTagBox,
    WriteEditorState,
  } = useWrite();

  const onChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    if (e.target.value.startsWith("/")) openTagBox(id);
    else if (WriteEditorState.isTagBox) closeTagBox();
    setText(e.target.value);
  };

  const clickTagButton = () => {
    click();
    WriteEditorState.isTagBox !== false ? closeTagBox() : openTagBox(data.id);
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
      console.log(e.dataTransfer.files[0]);
      e.preventDefault();
      setDrogOver(false);
      if (e.dataTransfer.files[0] !== undefined) {
        // dropImg(data.id, URL.createObjectURL(e.dataTransfer.files[0]), true);
        mutate(e.dataTransfer.files[0]);
      } else if (e.dataTransfer.getData("url") !== undefined) {
        console.log(e.dataTransfer.types, e.dataTransfer.getData("url"));
        // dropImg(data.id, e.dataTransfer.getData("url"), true);
      }
    },
    [data.id, mutate]
  );

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
      if (text !== data.text) setLineText(text, data.id);
      if (
        !(WriteEditorState.isTagBox === false) &&
        e.currentTarget.nextSibling
      ) {
        !e.currentTarget.nextSibling.contains(e.relatedTarget) && closeTagBox();
      }
    },
    [data.text, data.id, text, WriteEditorState.isTagBox]
  );

  const dragOver = useCallback(() => {
    setDrogOver(true);
  }, []);

  const dragLeave = useCallback(() => {
    setDrogOver(false);
  }, []);

  const onPasteImg = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.clipboardData.items[0] &&
        e.clipboardData.items[0].getAsString((string) => {
          if (string.startsWith("http")) {
            setLineText(string, data.id);
            setTag2A(data.id);
          }
        });
      // e.clipboardData.files[0] &&
      //   setImg(data.id, URL.createObjectURL(e.clipboardData.files[0]));
    },
    [data.id, setLineText, setTag2A]
  );

  const click = useCallback(() => {
    clickInputter(data.id);
  }, [data.id]);

  return {
    onChangeText,
    clickTagButton,
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
