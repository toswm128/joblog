import styled from "@emotion/styled";

export const BoardItemContainer = styled.div`
  /* 레이아웃 */
  width: 320px;
  min-width: 320px;

  /* 고급 */
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
  & > img {
    /* 레이아웃 */
    width: 100%;
    height: 240px;
    background-color: #c4c4c4;
    object-fit: cover;
  }
`;

export const BoardItemContent = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0px 10px;
  gap: 4px;

  .BoardIitle {
    font-weight: bold;
    min-height: 19px;
  }

  .BoardInfo {
    /* 레이아웃 */
    display: flex;
    justify-content: space-between;
    min-height: 20px;
    div {
      /* 레이아웃 */
      display: flex;
      align-items: center;
      gap: 32px;

      img {
        /* 레이아웃 */
        width: 20px;
        height: 20px;
      }
      p {
        /* 레이아웃 */
        display: flex;
        align-items: center;
        margin: 0;
        gap: 12px;
      }
    }
    .BoardWriter {
      /* 고급 */
      font-size: 0.75rem;
    }
  }
  .boardDate {
    /* 레이아웃 */
    display: flex;
    justify-content: flex-end;
    min-height: 15px;

    /* 고급 */
    font-size: 0.75rem;
  }
`;
