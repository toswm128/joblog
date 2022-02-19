import React, { useState, useEffect } from "react";
import useWrite from "hooks/write";
import { lineData } from "./WriteEditorType";
import EditorInputter from "./EditorItem/EditorInputtor";
import { line } from "Store/WriteEditorStore/type";

const WriteEditor = () => {
  const title = useWrite();
  const { WriteEditorState } = useWrite();
  useEffect(() => {
    console.log(WriteEditorState);
  });
  return (
    <>
      <input
        type="text"
        className="title"
        placeholder="제목을 입력해주세요..."
        onChange={e => title.changeText(e)}
        value={title.text}
      />

      {WriteEditorState.body.map((current: line) => (
        <EditorInputter data={current} />
      ))}
    </>
  );
};

export default WriteEditor;
