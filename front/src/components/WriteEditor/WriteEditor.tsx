import React from "react";
import useWrite from "hooks/write";
import EditorInputter from "./EditorItem/EditorInputtor";
import { line } from "Store/WriteEditorStore/type";
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogAPI from "assets/API/BlogAPI";

const WriteEditor = () => {
  const [title, setTitle] = useState("");
  const { WriteEditorState, unsetImg } = useWrite();
  const dom: any = [];
  const { postBoard } = new BlogAPI();

  // const bodyChek = () => {
  //   let next;
  //   WriteEditorState.body[WriteEditorState.head];
  //   for (let i = 0; i <= WriteEditorState.body.length; i++) {
  //     return;
  //   }
  // };
  let next: number | null;
  let snext: number | null;

  const tagTranslator = (data: line, key: number) => {
    switch (data.tag) {
      case "div":
        return (
          <div key={key}>
            <EditorInputter data={data} key={key} />
          </div>
        );
      case "ul":
        return (
          <ul className="tab" key={key}>
            <EditorInputter data={data} key={key} />
          </ul>
        );
      case "img":
        return (
          <img
            src={data.src}
            alt=""
            onError={() => {
              console.log("error");
            }}
            key={key}
            onClick={() => unsetImg(data.id)}
          />
        );
      case "a":
        return (
          <Link target="_blank" to={data.src} key={key}>
            {data.src}
          </Link>
        );
    }
  };

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
          dom.push(WriteEditorState.body[WriteEditorState.head]);
          return tagTranslator(
            WriteEditorState.body[WriteEditorState.head],
            key
          );
        }
        if (next !== null) {
          snext = WriteEditorState.body[next].next;
          dom.push(WriteEditorState.body[next]);
          return tagTranslator(WriteEditorState.body[next], key);
        }
      })}
      <button
        onClick={() => {
          const data = {
            userIdx: 0,
            context: JSON.stringify(dom),
            title: "test",
            writer: "조민수",
            banner:
              "https://dispatch.cdnser.be/wp-content/uploads/2018/12/bb3e3ac98f5ac653a8c07412d561dafc.jpg",
          };
          postBoard(data);
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default WriteEditor;
