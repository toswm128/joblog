import styled from "@emotion/styled";
import { basicColor } from "style/color";

export const CommentItemContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* 고급 */
  border-bottom: 1px solid ${basicColor};

  .comment-info {
    /* 레이아웃 */
    display: flex;
    gap: 16px;

    img {
      /* 레이아웃 */
      width: 40px;
      height: 40px;
      /* 고급 */
      border-radius: 50%;
    }
    .comment-info-content {
      /* 레이아웃 */
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .comment-title {
        /* 고급 */
        font-size: 18px;
        font-weight: bold;
      }
      .comment-date {
        /* 고급 */
        font-size: 13px;
        color: ${basicColor};
      }
    }
  }
  .comment-content {
    /* 레이아웃 */
    margin: 0 0 16px 56px;
  }
`;
