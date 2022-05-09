import styled from "@emotion/styled";

export const CommentContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* 고급 */
  border-bottom: 1px solid #c4c4c4;

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
        color: #c4c4c4;
      }
    }
  }
  .comment-content {
    /* 레이아웃 */
    margin: 0 0 16px 56px;
  }
`;
