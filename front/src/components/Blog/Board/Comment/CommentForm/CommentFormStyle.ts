import styled from "@emotion/styled";
import { basicColor } from "style/color";

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
      padding: 3px 4px;
      /* 고급 */
      font-size: 0.9rem;
      border: 1px solid ${basicColor};
      &::placeholder {
        /* 고급 */
        color: ${basicColor};
      }
    }
  }
`;
