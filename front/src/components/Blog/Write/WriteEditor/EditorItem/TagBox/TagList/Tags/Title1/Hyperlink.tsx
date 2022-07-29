import { TagContainer } from "../TagsStyle";
import useWrite from "hooks/write/useWrite";
import useTags from "../useTags";

const Hyperlink = () => {
  const { setTag2A } = useWrite();
  const { selectTag } = useTags();

  return (
    <TagContainer
      onClick={() => {
        selectTag(setTag2A);
      }}
    >
      <h1>하이퍼링크</h1>
      <span>외부 링크</span>
    </TagContainer>
  );
};

export default Hyperlink;
