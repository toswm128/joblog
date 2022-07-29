import styled from "@emotion/styled";
import Title1 from "./Tags/Title1/Title1";
import Title2 from "./Tags/Title1/Title2";
import Title3 from "./Tags/Title1/Title3";
import Hyperlink from "./Tags/Title1/Hyperlink";

const TagList = () => {
  return (
    <TagListContainer>
      <Title1 />
      <Title2 />
      <Title3 />
      <Hyperlink />
    </TagListContainer>
  );
};

const TagListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TagList;
