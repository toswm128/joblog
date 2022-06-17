import styled from "@emotion/styled";
import { basicColor } from "style/color";

export const SearchBoardContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-wrap: wrap;
  max-width: 1692px;
  margin: 0 auto 0 auto;

  h2 {
    width: 100%;
    border-bottom: 1px solid ${basicColor};
    margin-top: 16px;
    font-weight: normal;
    span {
      font-weight: bold;
      font-size: 1.6rem;
    }
  }

  a {
    color: black;
    text-decoration: none;
  }

  /* 미디어 쿼리 */
  @media (max-width: 1738px) {
    max-width: 1349px;
  }
  @media (max-width: 1395px) {
    max-width: 1006px;
  }
  @media (max-width: 1052px) {
    max-width: 663px;
  }
  @media (max-width: 709px) {
    max-width: 320px;
  }
`;
