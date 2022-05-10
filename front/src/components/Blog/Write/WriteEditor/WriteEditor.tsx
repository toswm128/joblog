import React from "react";
import useWrite from "hooks/write";
import EditorInputter from "./EditorItem/EditorInputtor";
import { line } from "Store/WriteEditorStore/type";
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogAPI from "assets/API/BlogAPI";
import useUser from "hooks/user";
import { useQueryClient } from "react-query";

const WriteEditor = () => {
  // const [title, setTitle] = useState("");
  const { WriteEditorState, unsetImg, setTitle } = useWrite();
  const { body, head, title, banner } = WriteEditorState;
  const dom: any = [];
  const { postBoard } = new BlogAPI();
  const { user } = useUser();
  const queryClient = useQueryClient();

  // const bodyChek = () => {
  //   let next;
  //   WriteEditorState.body[WriteEditorState.head];
  //   for (let i = 0; i <= WriteEditorState.body.length; i++) {
  //     return;
  //   }
  // };
  let next: number | null;
  let snext: number | null;

  const tagTranslator = (data: line) => {
    switch (data.tag) {
      case "div":
        return (
          <div key={data.id}>
            <EditorInputter data={data} key={data.id} />
          </div>
        );
      case "ul":
        return (
          <ul className="tab" key={data.id}>
            <EditorInputter data={data} key={data.id} />
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
            key={data.id}
            onClick={() => unsetImg(data.id)}
          />
        );
      case "a":
        return (
          <Link target="_blank" to={data.src} key={data.id}>
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
      {body.map((_, key: number) => {
        next = snext;
        if (key === 0) {
          next = body[head].next;
          snext = next;
          dom.push(body[head]);
          return tagTranslator(body[head]);
        }
        if (next !== null) {
          snext = body[next].next;
          dom.push(body[next]);
          return tagTranslator(body[next]);
        }
      })}
      <button
        onClick={() => {
          dom && title && banner
            ? postBoard(dom, title, banner).then(() =>
                queryClient.invalidateQueries("getBoard")
              )
            : alert("작성 다 하셈");
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default WriteEditor;
