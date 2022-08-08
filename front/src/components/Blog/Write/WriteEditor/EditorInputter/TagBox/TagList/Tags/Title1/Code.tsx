import { TagContainer } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";
import useTags from "../useTags";

const Code = () => {
  const { setTag2Code } = useWrite();
  const { selectTag } = useTags();

  return (
    <TagContainer
      onClick={() => {
        selectTag(setTag2Code);
      }}
    >
      <h1>코드</h1>
      <span>코드 작성</span>
    </TagContainer>
  );
};

export default Code;
