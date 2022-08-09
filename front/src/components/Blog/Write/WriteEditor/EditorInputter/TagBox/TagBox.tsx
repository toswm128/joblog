import styled from "@emotion/styled";
import { browserColor } from "style/color";
import TagList from "./TagList";

const TagBox = () => {
  return (
    <TagBoxContainer tabIndex={0}>
      <TagBoxTitle>기본 태그</TagBoxTitle>
      <TagList />
    </TagBoxContainer>
  );
};

const TagBoxContainer = styled.div`
  left: 12px;
  position: absolute;
  width: 300px;
  max-height: 300px;
  overflow-y: auto;
  top: 33px;
  background-color: ${browserColor};
  display: flex;
  flex-direction: column;
  z-index: 999;
  padding: 8px;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
`;

const TagBoxTitle = styled.h3`
  margin: 0;
  font-size: 0.5rem;
  font-weight: normal;
`;

export default TagBox;
