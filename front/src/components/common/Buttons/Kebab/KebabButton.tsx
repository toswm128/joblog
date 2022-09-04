import styled from "@emotion/styled";
import kebab from "assets/png/kebab.png";
import { useCallback, useEffect, useRef, useState } from "react";
import { basicColor } from "style/color";

interface IKebabButton {
  children: JSX.Element;
}

const KebabButton = ({ children }: IKebabButton) => {
  const modalEl = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (isOpen && !modalEl.current?.contains(target)) setIsOpen(false);
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <KebabContainer ref={modalEl}>
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
  overflow-y: auto;
  width: 200px;
  max-height: 300px;
  right: 0;
  border: 1px solid ${basicColor};
  box-shadow: 3px -3px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

export default KebabButton;
