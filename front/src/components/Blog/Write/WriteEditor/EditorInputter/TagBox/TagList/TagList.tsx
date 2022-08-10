import styled from "@emotion/styled";
import Title1 from "./Tags/Title1";
import Title2 from "./Tags/Title2";
import Title3 from "./Tags/Title3";
import Hyperlink from "./Tags/Hyperlink";
import Code from "./Tags/Code";
import CallOut from "./Tags/CallOut";

const TagList = () => {
  return (
    <TagListContainer>
      <Title1 />
      <Title2 />
      <Title3 />
      <Hyperlink />
      <Code />
      <CallOut />
    </TagListContainer>
  );
};

const TagListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TagList;
