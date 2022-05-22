import { useEffect, useMemo } from "react";
import useWrite from "hooks/write";
import { useState } from "react";
import EditorList from "./EditorList";
import { WriteComponent } from "../WriteStyle";
import EditorBanner from "./EditorBanner/EditorBanner";

const WriteEditor = () => {
  const { WriteEditorState, setTitle, setBanner } = useWrite();
  const { title, banner } = WriteEditorState;

  return (
    <>
      <EditorBanner />
      <WriteComponent>
        <input
          type="text"
          className="title"
          placeholder="제목을 입력해주세요..."
          onChange={e => setTitle(e.target.value)}
          value={title}
        />

        <EditorList />
      </WriteComponent>
    </>
  );
};

export default WriteEditor;
