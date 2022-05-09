import styled from "@emotion/styled";

export const BoardItemContainer = styled.div`
  /* 레이아웃 */
  width: 320px;
  height: 320px;
  min-width: 320px;

  /* 고급 */
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
  img {
    /* 레이아웃 */
    width: 100%;
    height: 240px;
    object-fit: cover;
  }
`;

export const BoardItemContent = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0px 10px;
  gap: 4px;

  .title {
    font-weight: bold;
  }

  .info {
    /* 레이아웃 */
    display: flex;
    justify-content: space-between;
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
    .writer {
      /* 고급 */
      font-size: 0.75rem;
    }
  }
  .date {
    /* 레이아웃 */
    display: flex;
    justify-content: flex-end;

    /* 고급 */
    font-size: 0.75rem;
  }
`;
