import styled from "@emotion/styled";
import { browserColor } from "style/color";

const TagBox = () => {
  return (
    <TagBoxContainer>
      <div>기본 태그</div>
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
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
`;

export default TagBox;
