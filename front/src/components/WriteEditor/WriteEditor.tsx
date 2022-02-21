import React, { useState } from "react";
import useWrite from "hooks/write";
import { lineData } from "./WriteEditorType";
import EditorInputter from "./EditorItem/EditorInputtor";
import { line } from "Store/WriteEditorStore/type";

const WriteEditor = () => {
  const title = useWrite();
  const { WriteEditorState } = useWrite();

  return (
    <>
      <input
        type="text"
        className="title"
        placeholder="제목을 입력해주세요..."
        onChange={e => title.changeText(e)}
        value={title.text}
      />

      {WriteEditorState.body.map((current: line, key: React.Key) => (
        <EditorInputter data={current} key={key} />
      ))}
    </>
  );
};

export default WriteEditor;
