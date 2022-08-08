import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { line } from "Store/WriteEditorStore/type";
import {
  BoardContextContainer,
  BoardContextDivTag,
  BoardContextH1Tag,
  BoardContextH2Tag,
  BoardContextH3Tag,
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
          case "h1":
            return (
              <BoardContextH1Tag key={current.id}>
                {current.text}
              </BoardContextH1Tag>
            );
          case "h2":
            return (
              <BoardContextH2Tag key={current.id}>
                {current.text}
              </BoardContextH2Tag>
            );
          case "h3":
            return (
              <BoardContextH3Tag key={current.id}>
                {current.text}
              </BoardContextH3Tag>
            );
          case "ul":
            return (
              <BoardContextUlTag key={current.id}>
                {current.text}
              </BoardContextUlTag>
            );
          case "code":
            const text = current.text.replace(/\\n/g, "\n");
            return (
              <SyntaxHighlighter
                language="javascript"
                lineProps={{
                  style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                }}
                wrapLines={true}
                style={docco}
                showLineNumbers
                key={current.id}
              >
                {text}
              </SyntaxHighlighter>
            );
          case "img":
            return (
              <BoardContextImgTag key={current.id} src={current.src} alt="" />
            );

          case "a":
            return (
              <a
                target="_blank"
                href={current.text}
                key={current.id}
                rel="noreferrer"
              >
                {current.text}
              </a>
            );
          default:
            return null;
        }
      })}
    </BoardContextContainer>
  );
};

export default BoardContext;
