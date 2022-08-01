import { useCallback } from "react";
import { line } from "Store/WriteEditorStore/type";
import EditorInputter from "../../EditorInputter";
import { A, H1, H2, H3 } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";
import { Draggable } from "react-beautiful-dnd";

interface TEditorItem {
  line: line;
  index: number;
}

const EditorItem = ({ line, index }: TEditorItem) => {
  const { unsetImg } = useWrite();

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
        case "a":
          return (
            <A key={data.id}>
              <EditorInputter data={data} key={data.id} />
            </A>
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
      }
    },
    [unsetImg]
  );

  return (
    <Draggable draggableId={`${line.id}`} index={index}>
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {tagTranslator(line)}
        </ul>
      )}
    </Draggable>
  );
};

export default EditorItem;