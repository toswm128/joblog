import styled from "@emotion/styled";
import { basicColor } from "style/color";

export const SearchFormContainer = styled.div`
  width: 515px;
  height: 40px;
`;

export const SearchFormComponent = styled.form`
  /* 레이아웃 */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 515px;
  height: 40px;
  /* 고급 */
  border: 1px solid ${basicColor};
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
    color: ${basicColor};
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
    border: 1px solid ${basicColor};
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0);
    font-size: 14px;
    color: ${basicColor};
    cursor: pointer;
    &:hover {
      border: 1px solid black;
      color: black;
    }
  }
`;

export const SearchDataList = styled.div`
  width: 515px;
  left: -1;
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow-y: auto;

  a {
    border: 1px solid ${basicColor};
    border-top: 0px;
    box-sizing: border-box;
    color: black;
    padding: 8px 0 8px 0;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #e8e8e8;
    }
  }
`;
