import { TagContainer } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";
import useTags from "../useTags";

const Title2 = () => {
  const { setTag2H2 } = useWrite();
  const { selectTag } = useTags();
  return (
    <TagContainer
      onClick={() => {
        selectTag(setTag2H2);
      }}
    >
      <h1>제목2</h1>
      <span>섹션 제목(중)</span>
    </TagContainer>
  );
};

export default Title2;
