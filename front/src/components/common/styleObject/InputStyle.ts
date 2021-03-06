import styled from "@emotion/styled";
import { basicColor } from "style/color";

export const CommentInput = styled.input`
  /* 레이아웃 */
  width: 100%;
  border-radius: 9px;
  height: 40px;
  padding: 0 3px;
  /* 고급 */
  font-size: 18px;
  border: 1px solid ${basicColor};
  &::placeholder {
    /* 고급 */
    color: ${basicColor};
  }
`;

export const InputContainer = styled.input`
  /* 레이아웃 */
  width: 552px;
  height: 53px;
  padding: 0 20px;
  box-sizing: border-box;
  /* 고급 */
  font-size: 20px;
  border: 2.5px solid black;
  outline: none;
  border-radius: 66px;
  &::placeholder {
    color: black;
  }
`;
