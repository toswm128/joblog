import styled from "@emotion/styled";

export const DetailPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > img {
    /* 레이아웃 */
    width: 100%;
    height: 320px;
    object-fit: cover;
  }
`;

export const DetailPageContent = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 auto;

  @media (max-width: 800px) {
    width: 100%;
  }

  .profil {
    /* 레이아웃 */
    align-items: center;
    display: flex;
    gap: 14px;
  }
  .title {
    /* 고급 */
    font-size: 48px;
    font-weight: bold;
  }

  .info {
    /* 레이아웃 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    .profilImg {
      /* 고급 */
      border-radius: 50%;
    }
    img {
      /* 레이아웃 */
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
  }

  .content {
    /* 레이아웃 */
    display: flex;
    flex-direction: column;
  }
`;

export const DetailCommentsList = styled.div`
  /* 레이아웃 */
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  /* '---content---' 구성 */
  /* '---' 와같은 선 중간에 택스처 배치를 위한 css */
  & > p {
    /* 레이아웃 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    div {
      /* 레이아웃 */
      width: 100%;
      /* 고급 */
      border: 1px solid black;
    }
    text {
      /* 레이아웃 */
      position: absolute;
      padding: 0 6px;
      /* 고급 */
      background-color: white;
    }
  }

  .commentForm {
    display: flex;
    flex-direction: column;
    margin: 16px 0;
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
    }
  }
`;
