import useBlogAPI from "assets/API/useBlogAPI";
import useWrite from "hooks/write";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import EditorItem from "./EditorItem/EditorItem";
import { line } from "Store/WriteEditorStore/type";

const EditorList = () => {
  const { WriteEditorState, reset, dropLine } = useWrite();
  const { body, head, title, banner } = WriteEditorState;
  const { postBoard } = useBlogAPI();
  const queryClient = useQueryClient();
  const dom: any[] = [];
  const navigate = useNavigate();

  let next: number | null;
  let snext: number | null;

  body.map((_, key: number) => {
    next = snext;
    if (key === 0) {
      next = body[head].next;
      snext = next;
      dom.push(body[head]);
    }
    if (next !== null) {
      snext = body[next].next;
      dom.push(body[next]);
    } else {
      return null;
    }
  });
  console.log(dom);

  return (
    <>
      {/* {body.map((_, key: number) => {
        next = snext;
        if (key === 0) {
          next = body[head].next;
          snext = next;
          dom.push(body[head]);
          return <EditorItem key={head} line={body[head]} />;
        }
        if (next !== null) {
          snext = body[next].next;
          dom.push(body[next]);
          console.log("out", body[next]);
          console.log(body[next]);
          return <EditorItem key={next} line={body[next]} />;
        } else {
          return null;
        }
      })} */}
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          console.log(result.destination.index, dom);
          // dropLine(
          //   result.source.index,
          //   result.destination?.index,
          //   +result.draggableId,
          //   dom[result.destination?.index].id
          // );
        }}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {dom.map((line: line, key: number) => (
                <EditorItem key={line.id} line={line} index={key} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* return tagTranslator(body[next]); */}
      {/* tagTranslator(body[head],provided) */}
      <button
        onClick={() => {
          console.log("dom");
          console.log(dom);
          // dom && title && banner
          //   ? postBoard(dom, title, banner).then(() => {
          //       queryClient.invalidateQueries("blogs");
          //       reset();
          //       navigate("/");
          //     })
          //   : alert("작성 다 하셈");
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default EditorList;
