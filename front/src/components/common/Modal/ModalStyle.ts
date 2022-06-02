import styled from "@emotion/styled";

export const ModalContainer = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 31;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalCard = styled.div`
  width: 615px;
  min-height: 335px;
  display: flex;
  justify-content: center;
  row-gap: 50px;
  padding: 15px 0;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;

  & > h2 {
    font-size: 2rem;
    margin: 0;
  }

  & > span {
    font-size: 1.3rem;
  }

  & > button {
    outline: none;
    border: 0;
    background-color: black;
    border-radius: 8px;
    cursor: pointer;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      color: white;
      font-size: 1.1rem;
      margin: 0 24px 0 24px;
    }
  }
`;
