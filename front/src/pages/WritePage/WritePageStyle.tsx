import styled from "@emotion/styled";

export const WritePageContainer = styled.div`
  /* 레이아웃 */
  width: 100%;
  display: flex;
  flex-direction: column;

  & > label {
    /* 레이아웃 */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 320px;
    /* 고급 */
    font-size: 48px;
    font-weight: bold;
    color: #c4c4c4;
    background-color: #e5e5e5;
  }
`;

export const WirtePageContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 auto;
  @media (max-width: 800px) {
    width: 100%;
  }

  .title {
    /* 레이아웃 */
    display: flex;
    align-items: center;
    height: 48px;
    padding: 1px 2px;
    /* 고급 */
    font-size: 48px;
    border: 0;
    outline: none;
    cursor: text;
  }
  .title::placeholder {
    /* 고급 */
    font-size: 48px;
    color: #c4c4c4;
  }
`;
