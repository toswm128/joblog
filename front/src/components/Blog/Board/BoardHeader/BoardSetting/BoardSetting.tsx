import useBlogAPI from "assets/API/useBlogAPI";
import KebabButton from "components/common/Buttons/Kebab/KebabButton";
import KebabItem from "components/common/Buttons/Kebab/KebabItem";
import { useQuery } from "react-query";
import useModal from "hooks/modal";
import useWrite from "hooks/write/useWrite";
import { useNavigate } from "react-router-dom";

const useBoardSetting = (idx: string) => {
  const { putSetUp } = useWrite();
  const { getBoard, deleteBoard } = useBlogAPI();
  const { closeModal } = useModal();
  const navigate = useNavigate();
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
    putSetUp(body, board?.blog?.title, idx);
    navigate("/write");
    closeModal();
  };

  const removeBoard = () => {
    deleteBoard(idx);
    navigate("/");
    closeModal();
  };
  return { putBoard, removeBoard };
};

interface IBoardSetting {
  idx: string;
}

const BoardSetting = ({ idx }: IBoardSetting) => {
  const { putBoard, removeBoard } = useBoardSetting(idx);
  const { openModal } = useModal();
  return (
    <KebabButton>
      <>
        <KebabItem onClick={() => openModal("board/setting/put", { putBoard })}>
          <>수정하기</>
        </KebabItem>
        <KebabItem
          onClick={() => openModal("board/setting/delete", { removeBoard })}
        >
          <>삭제하기</>
        </KebabItem>
      </>
    </KebabButton>
  );
};

export default BoardSetting;
