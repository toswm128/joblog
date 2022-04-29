import { ReactChild, ReactFragment, ReactPortal } from "react";
import { Link } from "react-router-dom";
import { line } from "Store/WriteEditorStore/type";
import {
  BoardContextContainer,
  BoardContextDivTag,
  BoardContextImgTag,
  BoardContextUlTag,
} from "./BoardContextStyle";

const BoardContext = ({ context }: { context: string }) => {
  const contextDom = JSON.parse(context);
  return (
    <BoardContextContainer>
      {contextDom.map((current: line, key: any) => {
        console.log(current.tag);
        switch (current.tag) {
          case "div":
            return (
              <BoardContextDivTag key={key}>{current.text}</BoardContextDivTag>
            );
          case "ul":
            return (
              <BoardContextUlTag key={key}>{current.text}</BoardContextUlTag>
            );
          case "img":
            return <BoardContextImgTag key={key} src={current.src} alt="" />;

          case "a":
            return (
              <Link target="_blank" to={current.src} key={key}>
                {current.src}
              </Link>
            );
        }
      })}
    </BoardContextContainer>
  );
};

export default BoardContext;
