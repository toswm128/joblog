import styled from "@emotion/styled";

export const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  & > h1 {
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
  }
  & > span {
    margin: 0;
    font-size: 0.7rem;
  }
`;
