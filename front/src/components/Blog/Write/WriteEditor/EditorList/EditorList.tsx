import useBlogAPI from "assets/API/useBlogAPI";
import useWrite from "hooks/write";
import { useCallback } from "react";
import { useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { line } from "Store/WriteEditorStore/type";
import EditorInputter from "../EditorItem";
import { H1, H2, H3 } from "./TagsStyle";

const EditorList = () => {
  const { WriteEditorState, unsetImg, reset } = useWrite();
  const { body, head, title, banner } = WriteEditorState;
  const dom: any = [];
  const { postBoard } = useBlogAPI();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const tagTranslator = useCallback(
    (data: line) => {
      switch (data.tag) {
        case "div":
          return (
            <div key={data.id}>
              <EditorInputter data={data} key={data.id} />
            </div>
          );
        case "h1":
          return (
            <H1 key={data.id}>
              <EditorInputter data={data} key={data.id} />
            </H1>
          );
        case "h2":
          return (
            <H2 key={data.id}>
              <EditorInputter data={data} key={data.id} />
            </H2>
          );
        case "h3":
          return (
            <H3 key={data.id}>
              <EditorInputter data={data} key={data.id} />
            </H3>
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
    },
    [unsetImg]
  );

  let next: number | null;
  let snext: number | null;
  return (
    <>
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
        } else {
          return null;
        }
      })}
      <button
        onClick={() => {
          dom && title && banner
            ? postBoard(dom, title, banner).then(() => {
                queryClient.invalidateQueries("blogs");
                reset();
                navigate("/");
              })
            : alert("작성 다 하셈");
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default EditorList;
