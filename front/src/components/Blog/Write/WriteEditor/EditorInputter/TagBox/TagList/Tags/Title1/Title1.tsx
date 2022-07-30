import { TagContainer } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";
import useTags from "../useTags";

const Title1 = () => {
  const { setTag2H1 } = useWrite();
  const { selectTag } = useTags();

  return (
    <TagContainer
      onClick={() => {
        selectTag(setTag2H1);
      }}
    >
      <h1>제목1</h1>
      <span>섹션 제목(대)</span>
    </TagContainer>
  );
};

export default Title1;
