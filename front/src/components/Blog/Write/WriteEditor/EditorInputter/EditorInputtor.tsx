import styled from "@emotion/styled";
import useWrite from "hooks/write";
import { useEffect } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { line } from "Store/WriteEditorStore/type";
import TagBox from "./TagBox";
import useEditorInputter from "./useEditorInputter";
import tag from "assets/png/tag.png";

const EditorInputter = ({ data }: { data: line }) => {
  const { WriteEditorState } = useWrite();

  useEffect(() => {
    if (data.id === WriteEditorState.focusLine && inputterRef.current) {
      inputterRef.current.setSelectionRange(9999, 9999);
      inputterRef.current.focus();
    }
  }, [WriteEditorState.focusLine, data.id]);

  const {
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
  } = useEditorInputter(data);

  return (
    <EditorInputterLine>
      <img
        src={tag}
        alt=""
        width={12}
        height={18}
        onClick={() => clickTagButton()}
      />
      <ReactTextareaAutosize
        placeholder={
          data.id === WriteEditorState.focusLine ? "내용을 입력해 주세요" : ""
        }
        spellCheck={false}
        // cacheMeasurements
        style={drogOver ? { borderBottom: "5px solid #c4e3f0" } : {}}
        onKeyDown={(e) => {
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
        onDrop={onDropUrl}
        onDragOver={() => {
          dragOver();
        }}
        onDragLeave={() => {
          dragLeave();
        }}
        className="content"
        value={text}
        ref={inputterRef}
        disabled={false}
        onPaste={onPasteImg}
        onKeyPress={onKeyPressEnter}
        onClick={() => {
          click();
        }}
        onChange={(e) => onChangeText(e, data.id)}
        onBlur={onBlur}
      />
      {data.id === WriteEditorState.isTagBox &&
        data.id === WriteEditorState.focusLine && <TagBox />}
    </EditorInputterLine>
  );
};

const EditorInputterLine = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  &:hover {
    & > img {
      opacity: 1;
    }
  }
  & > img {
    opacity: 0;
    transition: 0.2s;
  }
`;

export default EditorInputter;
