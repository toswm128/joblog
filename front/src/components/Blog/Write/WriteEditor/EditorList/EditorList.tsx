import useBlogAPI from "assets/API/useBlogAPI";
import useWrite from "hooks/write";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import EditorItem from "./EditorItem/EditorItem";
import { line } from "Store/WriteEditorStore/type";
import styled from "@emotion/styled";
import DefaultButton from "components/common/Buttons/DefaultButton";

const EditorList = () => {
  const { WriteEditorState, reset, dropLine } = useWrite();
  const { body, head, title, banner, putId } = WriteEditorState;
  const { postBoard, putBoard } = useBlogAPI();
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

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          console.log(result.destination.index, dom);
          dropLine(
            result.source.index,
            result.destination?.index,
            +result.draggableId,
            dom[result.destination?.index].id
          );
        }}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <EditorListContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {dom.map((line: line, key: number) => (
                <EditorItem key={line.id} line={line} index={key} />
              ))}
              {provided.placeholder}
            </EditorListContainer>
          )}
        </Droppable>
      </DragDropContext>
      {WriteEditorState.putId ? (
        <DefaultButton
          onClick={() => {
            console.log(dom);
            title &&
              putBoard(dom, title, putId, banner).then(() => {
                queryClient.refetchQueries("blogs");
                reset();
                navigate("/");
              });
          }}
          isAbled={title ? true : false}
          size={"M"}
        >
          <>수정하기</>
        </DefaultButton>
      ) : (
        <DefaultButton
          onClick={() => {
            console.log(dom);
            title &&
              postBoard(dom, title, banner).then(() => {
                queryClient.refetchQueries("blogs");
                reset();
                navigate("/");
              });
          }}
          isAbled={title ? true : false}
          size={"M"}
        >
          <>작성하기</>
        </DefaultButton>
      )}
    </>
  );
};

const EditorListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export default EditorList;
