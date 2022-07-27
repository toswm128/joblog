import { TagContainer } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";

const Title2 = () => {
  const {
    setTag2H2,
    WriteEditorState: { isTagBox },
    closeTagBox,
  } = useWrite();
  return (
    <TagContainer
      onClick={() => {
        typeof isTagBox === "number" && setTag2H2(isTagBox);
        closeTagBox();
      }}
    >
      <h1>제목2</h1>
      <span>섹션 제목(중)</span>
    </TagContainer>
  );
};

export default Title2;
