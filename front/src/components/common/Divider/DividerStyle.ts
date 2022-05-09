import styled from "@emotion/styled";

export const DividerContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  p {
    /* 레이아웃 */
    width: 100%;
    /* 고급 */
    border: 1px solid black;
  }
  span {
    /* 레이아웃 */
    position: absolute;
    padding: 0 6px;
    /* 고급 */
    background-color: white;
  }
`;
