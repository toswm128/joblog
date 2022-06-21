import styled from "@emotion/styled";
import { backgroundColor, basicColor, newBlack } from "style/color";

export const SearchFormContainer = styled.div`
  width: 720px;
  height: 40px;
`;

export const SearchFormComponent = styled.form`
  /* 레이아웃 */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 720px;
  height: 40px;
  /* 고급 */
  box-sizing: border-box;
  justify-content: space-between;

  input {
    /* 레이아웃 */
    padding: 0 8px;
    width: 660px;
    height: 40px;
    box-sizing: border-box;
    /* 고급 */
    border: 0;
    border-radius: 10px;
    outline: none;
    font-size: 14px;
    background-color: white;
    border: 1px solid ${newBlack};
    &:focus {
      border-radius: 10px 10px 0 0;
      border-bottom: 0;
    }
  }
  input::placeholder {
    /* 고급 */
    font-size: 14px;
    color: ${newBlack};
  }

  /* 검색 */
  button {
    /* 레이아웃 */
    position: relative;
    left: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    /* 고급 */
    border: 1px solid ${newBlack};

    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
    font-size: 14px;
    color: ${newBlack};
    cursor: pointer;
  }
`;

export const SearchDataList = styled.div`
  width: 660px;
  left: -1;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid ${newBlack};
  border-radius: 0 0 10px 10px;
  border-top: 0px;

  a {
    box-sizing: border-box;
    color: black;
    padding: 8px;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #e8e8e8;
    }
  }
`;
