import styled from "@emotion/styled";
import { browserColor } from "style/color";

const TagBox = () => {
  return (
    <TagBoxContainer>
      <div>a</div>
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
`;

export default TagBox;
