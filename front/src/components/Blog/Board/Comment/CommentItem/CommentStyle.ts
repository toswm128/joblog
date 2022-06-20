import styled from "@emotion/styled";
import { basicColor } from "style/color";

export const CommentItemContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  gap: 16px;
  /* 고급 */
  border-bottom: 1px solid ${basicColor};
  & > img {
    /* 레이아웃 */
    width: 40px;
    height: 40px;
    /* 고급 */
    border-radius: 50%;
  }

  .comment-info {
    /* 레이아웃 */
    display: flex;
    flex-direction: column;
    gap: 16px;
    .comment-info-content {
      /* 레이아웃 */
      display: flex;
      gap: 4px;
      align-items: center;

      .comment-title {
        /* 고급 */
        font-size: 16px;
        font-weight: bold;
      }
      .comment-date {
        /* 고급 */
        font-size: 0.9rem;
        color: ${basicColor};
      }
    }
    .comment-content {
      /* 레이아웃 */
      font-size: 0.9rem;
      margin-bottom: 13px;
    }
  }
`;
