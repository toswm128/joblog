import styled from "@emotion/styled";
import { basicColor } from "style/color";

export const ModalShowButton = styled.div`
  font-size: 1.1rem;
  border-bottom: 1px solid ${basicColor};
  padding: 5px 0;
  cursor: pointer;
  &:hover {
    background-color: ${basicColor};
  }
`;
