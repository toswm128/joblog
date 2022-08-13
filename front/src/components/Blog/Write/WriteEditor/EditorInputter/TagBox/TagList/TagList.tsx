import styled from "@emotion/styled";
import Title1 from "./Tags/Title1";
import Title2 from "./Tags/Title2";
import Title3 from "./Tags/Title3";
import Hyperlink from "./Tags/Hyperlink";
import Code from "./Tags/Code";
import CallOut from "./Tags/CallOut";
import useWrite from "hooks/write/useWrite";

const TagList = () => {
  const {
    WriteEditorState: { searchWord },
  } = useWrite();
  const data = [
    { word: "/제목1", Tag: Title1 },
    { word: "/제목2", Tag: Title2 },
    { word: "/제목3", Tag: Title3 },
    { word: "/하이퍼링크", Tag: Hyperlink },
    { word: "/코드", Tag: Code },
    { word: "/콜아웃", Tag: CallOut },
  ];
  const search = () => {
    return searchWord
      ? data.map(
          ({ word, Tag }, key) => word.includes(searchWord) && <Tag key={key} />
        )
      : data.map(({ Tag }, key) => <Tag key={key} />);
  };

  return <TagListContainer>{search()}</TagListContainer>;
};

const TagListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TagList;
