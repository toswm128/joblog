import React from "react";
import useWrite from "hooks/write";
import EditorInputter from "./EditorItem/EditorInputtor";
import { line } from "Store/WriteEditorStore/type";
import { useState } from "react";

const WriteEditor = () => {
  const [title, setTitle] = useState("");
  const { WriteEditorState } = useWrite();

  // const bodyChek = () => {
  //   let next;
  //   WriteEditorState.body[WriteEditorState.head];
  //   for (let i = 0; i <= WriteEditorState.body.length; i++) {
  //     return;
  //   }
  // };
  let next: number | null;
  let snext: number | null;

  return (
    <>
      <input
        type="text"
        className="title"
        placeholder="제목을 입력해주세요..."
        onChange={e => setTitle(e.target.value)}
        value={title}
      />

      {/* {WriteEditorState.body.map((current: line, key: React.Key) => (
        <EditorInputter data={current} key={key} />
      ))} */}
      {WriteEditorState.body.map((current: line, key: number) => {
        next = snext;
        if (key === 0) {
          next = WriteEditorState.body[WriteEditorState.head].next;
          snext = next;
          // console.log(WriteEditorState.body[WriteEditorState.head]);
          return (
            <EditorInputter
              data={WriteEditorState.body[WriteEditorState.head]}
              key={key}
            />
          );
        }
        if (next !== null) {
          snext = WriteEditorState.body[next].next;
          // console.log(WriteEditorState.body[next]);
          return (
            <EditorInputter data={WriteEditorState.body[next]} key={key} />
          );
        }
      })}
    </>
  );
};

export default WriteEditor;
