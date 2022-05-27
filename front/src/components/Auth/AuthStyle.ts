import styled from "@emotion/styled";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;

  background-color: white;
`;

export const AuthComponents = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > img {
    width: 310px;
    margin-bottom: 27px;
  }

  /* & > div {
    display: flex;
    justify-content: center;
    gap: 13px;
  } */
`;
