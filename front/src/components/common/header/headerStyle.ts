import styled from "@emotion/styled";

export const HeaderContaier = styled.header`
  /* 레이아웃 */
  display: flex;
  height: 79px;
  margin-left: 23px;
  margin-right: 23px;
  justify-content: space-between;
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
    a {
      /* 고급 */
      color: #c4c4c4;
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

  .header-search {
    /* 레이아웃 */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 515px;
    height: 40px;
    /* 고급 */
    border: 1px solid #c4c4c4;
    border-radius: 40px;
    box-sizing: border-box;

    input {
      /* 레이아웃 */
      width: 443px;
      height: 40px;
      /* 고급 */
      border: 0;
      outline: none;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0);
    }
    input::placeholder {
      /* 고급 */
      font-size: 14px;
      color: #c4c4c4;
    }

    /* 검색 */
    button {
      /* 레이아웃 */
      position: relative;
      left: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 62px;
      height: 40px;
      /* 고급 */
      border: 1px solid #c4c4c4;
      border-radius: 40px;
      background-color: rgba(0, 0, 0, 0);
      font-size: 14px;
      color: #c4c4c4;
      cursor: pointer;
    }
  }

  .header-authBtn {
    /* 레이아웃 */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 40px;
    /* 고급 */
    border: 1px solid #c4c4c4;
    border-radius: 50px;
    font-size: 14px;
    color: #c4c4c4;
    cursor: pointer;
  }
`;
