import { TagContainer } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";

const Title3 = () => {
  const {
    setTag2H3,
    WriteEditorState: { isTagBox },
    closeTagBox,
  } = useWrite();
  return (
    <TagContainer
      onClick={() => {
        typeof isTagBox === "number" && setTag2H3(isTagBox);
        closeTagBox();
      }}
    >
      <h1>제목3</h1>
      <span>섹션 제목(소)</span>
    </TagContainer>
  );
};

export default Title3;
