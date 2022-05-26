import styled from "@emotion/styled";

export const CommentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  gap: 6px;

  & > div {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    img {
      /* 레이아웃 */
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
    .commentTextarea {
      /* 레이아웃 */
      width: 100%;
      border-radius: 9px;
      resize: none;
      height: auto;
      overflow-y: hidden;
      padding: 0 3px;
      /* 고급 */
      font-size: 1rem;
      border: 1px solid #c4c4c4;
      &::placeholder {
        /* 고급 */
        color: #c4c4c4;
      }
    }
  }
`;
