import styled from "@emotion/styled";
import { browserColor } from "style/color";

const TagBox = () => {
  return (
    <TagBoxContainer>
      <TagBoxTitle>기본 태그</TagBoxTitle>
    </TagBoxContainer>
  );
};

const TagBoxContainer = styled.div`
  position: absolute;
  width: 300px;
  min-height: 300px;
  top: 33px;
  background-color: ${browserColor};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
