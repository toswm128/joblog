import styled from "@emotion/styled";

export const SearchFormContainer = styled.form`
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
    &:hover {
      border: 1px solid black;
      color: black;
    }
  }
`;