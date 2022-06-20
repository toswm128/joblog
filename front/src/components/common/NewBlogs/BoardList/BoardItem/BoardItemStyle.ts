import styled from "@emotion/styled";
import { basicColor, DisabledColor } from "style/color";

export const BoardItemContainer = styled.div`
  /* 레이아웃 */
  width: 320px;
  min-width: 320px;
  margin-top: 23px;
  border-radius: 16px;
  /* 고급 */
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
  transition: 0.2s all ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2);
  }

  & > img {
    /* 레이아웃 */
    width: 100%;
    height: 240px;
    background-color: ${basicColor};
    object-fit: cover;
    border-radius: 16px 16px 0 0;
  }
`;

export const BoardItemContent = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0px 10px;
  height: 87px;

  .BoardIitle {
    font-weight: bold;
    min-height: 40px;
    max-height: 40px;
    margin-bottom: 6px;
    display: flex;
    align-items: flex-start;
  }

  .BoardWriter {
    /* 고급 */
    color: ${DisabledColor};
    font-size: 1rem;
  }
  .boardDate {
    /* 레이아웃 */
    display: flex;
    justify-content: flex-start;
    min-height: 15px;

    /* 고급 */
    font-size: 1rem;
    color: ${DisabledColor};
  }
`;
