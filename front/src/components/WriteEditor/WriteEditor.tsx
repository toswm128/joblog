import React from "react";
import useWrite from "hooks/write";
import EditorInputter from "./EditorItem/EditorInputtor";
import { line } from "Store/WriteEditorStore/type";
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogAPI from "assets/API/BlogAPI";
import useUser from "hooks/user";

const WriteEditor = () => {
  // const [title, setTitle] = useState("");
  const { WriteEditorState, unsetImg, setTitle } = useWrite();
  const { body, head, title, banner } = WriteEditorState;
  const dom: any = [];
  const { postBoard } = new BlogAPI();
  const { user } = useUser();

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
      {body.map((_, key: number) => {
        next = snext;
        if (key === 0) {
          next = body[head].next;
          snext = next;
          dom.push(body[head]);
          return tagTranslator(body[head], key);
        }
        if (next !== null) {
          snext = body[next].next;
          dom.push(body[next]);
          return tagTranslator(body[next], key);
        }
      })}
      <button
        onClick={() => {
          const formData = new FormData();
          user.userId && formData.append("userIdx", user.userId.toString());
          formData.append(
            "context",
            JSON.stringify(dom).replaceAll("\\n", "\\\\n")
          );
          formData.append("title", title);
          user.name && formData.append("writer", user.name);
          banner && formData.append("banner", banner);

          console.log(formData.get("context"));
          console.log(banner);
          postBoard(formData);
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default WriteEditor;
