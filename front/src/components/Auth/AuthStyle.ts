import styled from "@emotion/styled";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

  & > div {
    display: flex;
    justify-content: center;
    gap: 13px;
  }
`;
