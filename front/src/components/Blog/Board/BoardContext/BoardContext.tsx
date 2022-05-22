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
      {contextDom.map((current: line) => {
        switch (current.tag) {
          case "div":
            return (
              <BoardContextDivTag key={current.id}>
                {current.text}
              </BoardContextDivTag>
            );
          case "ul":
            return (
              <BoardContextUlTag key={current.id}>
                {current.text}
              </BoardContextUlTag>
            );
          case "img":
            return (
              <BoardContextImgTag key={current.id} src={current.src} alt="" />
            );

          case "a":
            return (
              <Link target="_blank" to={current.src} key={current.id}>
                {current.src}
              </Link>
            );
          default:
            return null;
        }
      })}
    </BoardContextContainer>
  );
};

export default BoardContext;
