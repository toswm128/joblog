import useBlogAPI from "assets/API/useBlogAPI";
import KebabButton from "components/common/Buttons/Kebab/KebabButton";
import KebabItem from "components/common/Buttons/Kebab/KebabItem";
import { useQuery } from "react-query";
import useModal from "hooks/modal";

const useBoardSetting = (idx: string) => {
  const { getBoard } = useBlogAPI();
  const { isLoading, data: { data: board } = {} } = useQuery(
    `board/${idx}`,
    () => getBoard(idx),
    {}
  );
  const putBoard = () => {
    console.log(board);
  };
  return { putBoard };
};

interface IBoardSetting {
  idx: string;
}

const BoardSetting = ({ idx }: IBoardSetting) => {
  const { putBoard } = useBoardSetting(idx);
  const { openModal } = useModal();
  return (
    <KebabButton>
      <>
        <KebabItem onClick={() => openModal("board/setting/put", { putBoard })}>
          <>수정하기</>
        </KebabItem>
        <KebabItem onClick={() => openModal("board/setting/delete", {})}>
          <>삭제하기</>
        </KebabItem>
      </>
    </KebabButton>
  );
};

export default BoardSetting;
