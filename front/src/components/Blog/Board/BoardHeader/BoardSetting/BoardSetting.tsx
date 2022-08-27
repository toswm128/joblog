import KebabButton from "components/common/Buttons/Kebab/KebabButton";
import KebabItem from "components/common/Buttons/Kebab/KebabItem";

const BoardSetting = () => {
  return (
    <KebabButton>
      <>
        <KebabItem>
          <>수정하기</>
        </KebabItem>
        <KebabItem>
          <>삭제하기</>
        </KebabItem>
      </>
    </KebabButton>
  );
};

export default BoardSetting;
