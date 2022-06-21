import styled from "@emotion/styled";
import { basicColor } from "style/color";

export const HeaderContaier = styled.header`
  /* 레이아웃 */
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  padding: 0 23px 0 23px;
  box-sizing: border-box;
  height: 79px;
  justify-content: space-between;
  align-items: center;

  background-color: white;
`;

export const HeaderLeft = styled.div`
  /* 레이아웃 */
  display: flex;
  justify-content: flex-start;
  align-items: center;

  /* 헤더 네비게이터 */
  .header-nav {
    /* 레이아웃 */
    width: 60px;
    text-align: center;
    a:hover {
      color: black;
    }
    a {
      /* 고급 */
      color: ${basicColor};
      font-size: 1rem;
    }
  }

  /* 헤더 로고 */
  .header-logo {
    /* 레이아웃 */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 24px;
  }
  img {
    /* 레이아웃 */
    width: 111px;
  }
`;

export const HeaderRight = styled.div`
  /* 레이아웃 */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;

  .header-authBtn {
    /* 레이아웃 */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 40px;
    /* 고급 */
    border: 1px solid ${basicColor};
    border-radius: 50px;
    font-size: 14px;
    color: ${basicColor};
    cursor: pointer;
    &:hover {
      border: 1px solid black;
      color: black;
    }
  }
`;
