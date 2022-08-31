import useBlogAPI from "assets/API/useBlogAPI";
import KebabButton from "components/common/Buttons/Kebab/KebabButton";
import KebabItem from "components/common/Buttons/Kebab/KebabItem";
import { useQuery } from "react-query";
import useModal from "hooks/modal";
import useWrite from "hooks/write/useWrite";

const useBoardSetting = (idx: string) => {
  const { putSetUp } = useWrite();
  const { getBoard } = useBlogAPI();
  const { data: { data: board } = {} } = useQuery(
    `board/${idx}`,
    () => getBoard(idx),
    {}
  );
  const putBoard = () => {
    const context = JSON.parse(board?.blog?.context);
    const body = context.map((item: any, key: any) => {
      item.id = key;
      if (context.length - 1 !== key) {
        item.next = key + 1;
      } else {
        item.next = null;
      }
      if (key !== 0) {
        item.prev = key - 1;
      } else {
        item.prev = null;
      }

      return item;
    });
    putSetUp(body, board?.blog?.title);
  };
  const deleteBoard = () => {
    console.log("delte");
  };
  return { putBoard, deleteBoard };
};

interface IBoardSetting {
  idx: string;
}

const BoardSetting = ({ idx }: IBoardSetting) => {
  const { putBoard, deleteBoard } = useBoardSetting(idx);
  const { openModal } = useModal();
  return (
    <KebabButton>
      <>
        <KebabItem onClick={() => openModal("board/setting/put", { putBoard })}>
          <>수정하기</>
        </KebabItem>
        <KebabItem
          onClick={() => openModal("board/setting/delete", { deleteBoard })}
        >
          <>삭제하기</>
        </KebabItem>
      </>
    </KebabButton>
  );
};

export default BoardSetting;
