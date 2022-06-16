import styled from "@emotion/styled";

export const NewBlogsContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-wrap: wrap;
  max-width: 1692px;
  column-gap: 23px;
  margin: 23px auto 0 auto;

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

export const BoardFlexContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  gap: 23px;
  width: 100%;

  a {
    color: black;
    text-decoration: none;
  }
`;
