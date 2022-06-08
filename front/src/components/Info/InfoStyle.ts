import styled from "@emotion/styled";

export const InfoContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  justify-content: space-between;
`;

export const UserBoardsContainer = styled.div`
  display: flex;
  max-width: 1006px;
  margin: 0 auto 0 auto;
  flex-wrap: wrap;
  gap: 23px;
  & > a {
    color: black;
  }

  /* @media (max-width: 1658px) {
    max-width: 1006px;
  } */
  @media (max-width: 1315px) {
    max-width: 663px;
  }
  @media (max-width: 972px) {
    max-width: 320px;
  }
`;

export const InfoComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;
  height: 100%;
  & > img {
    width: 310px;
    height: 310px;
    object-fit: cover;
    background-color: #c4c4c4;
    border-radius: 50%;
  }
  & > div {
    width: 310px;
  }
`;
