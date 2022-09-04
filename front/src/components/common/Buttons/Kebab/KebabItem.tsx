import styled from "@emotion/styled";
import { basicColor } from "style/color";

interface IKebabItem {
  onClick?: () => void;
  children: JSX.Element;
}

const KebabItem = ({ onClick, children }: IKebabItem) => {
  return <KebabItemContainer onClick={onClick}>{children}</KebabItemContainer>;
};

const KebabItemContainer = styled.div`
  font-size: 1.125rem;
  border-bottom: 1px solid ${basicColor};
  padding: 6px 3px;
  font-weight: normal;
  cursor: pointer;
`;

export default KebabItem;
