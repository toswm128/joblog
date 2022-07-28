import { TagContainer } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";
import useTags from "../useTags";

const Title3 = () => {
  const { setTag2H3 } = useWrite();
  const { selectTag } = useTags();
  return (
    <TagContainer
      onClick={() => {
        selectTag(setTag2H3);
      }}
    >
      <h1>제목3</h1>
      <span>섹션 제목(소)</span>
    </TagContainer>
  );
};

export default Title3;
