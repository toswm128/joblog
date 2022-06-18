import styled from "@emotion/styled";

interface IDefaultButton {
  onClick?: () => any;
  isAbled: boolean;
  children: JSX.Element;
  size: string;
}

const DefaultButton = ({
  children,
  onClick,
  isAbled,
  size,
}: IDefaultButton) => {
  const DefaultButtonStyle = styled.button`
    transition: 0.1s all;
    outline: none;
    border: 0;
    cursor: pointer;
    border-radius: 8px;
    min-width: ${(size === "L" && "104px") ||
    (size === "M" && "91px") ||
    (size === "S" && "78px")};
    height: ${(size === "L" && "48px") ||
    (size === "M" && "42px") ||
    (size === "S" && "36px")};
    padding: 0 16px;
    background-color: ${isAbled ? "#3D3D3D" : "#E4E4E4"};
    color: ${isAbled ? "white" : "#6C6C6C"};
    font-size: 18px;
    &:hover {
      background-color: ${isAbled ? "#5C5C5C" : "#DCDCDC"};
    }
    &:active {
      background-color: ${isAbled ? "#929292" : "#BCBCBC"};
    }
  `;
  return <DefaultButtonStyle onClick={onClick}>{children}</DefaultButtonStyle>;
};

export default DefaultButton;
