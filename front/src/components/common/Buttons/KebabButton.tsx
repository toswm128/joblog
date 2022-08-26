import styled from "@emotion/styled";
import kebab from "assets/png/kebab.png";
import { useState } from "react";

interface IKebabButton {
  children: JSX.Element;
}

const KebabButton = ({ children }: IKebabButton) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <KebabContainer>
      <KebabImg src={kebab} onClick={() => setIsOpen(!isOpen)} alt="" />
      {isOpen && <KebabModal>{children}</KebabModal>}
    </KebabContainer>
  );
};

const KebabContainer = styled.div`
  position: relative;
`;

const KebabImg = styled.img`
  height: 52px;
  cursor: pointer;
`;

const KebabModal = styled.div`
  position: absolute;
  z-index: 10;
  width: 200px;
  height: 300px;
  right: 0;
  background-color: red;
`;

export default KebabButton;
