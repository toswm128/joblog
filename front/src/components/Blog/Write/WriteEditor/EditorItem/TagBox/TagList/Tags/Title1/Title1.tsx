import { TagContainer } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";

const Title1 = () => {
  const {
    setTag2H1,
    WriteEditorState: { isTagBox },
    closeTagBox,
  } = useWrite();
  return (
    <TagContainer
      onClick={() => {
        typeof isTagBox === "number" && setTag2H1(isTagBox);
        closeTagBox();
      }}
    >
      <h1>제목1</h1>
      <span>섹션 제목(대)</span>
    </TagContainer>
  );
};

export default Title1;
