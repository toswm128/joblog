import KebabButton from "components/common/Buttons/Kebab/KebabButton";
import KebabItem from "components/common/Buttons/Kebab/KebabItem";
import useModal from "hooks/modal";
import useBoardSetting from "./useBoardSetting";

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
