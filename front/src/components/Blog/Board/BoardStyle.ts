import styled from "@emotion/styled";

export const BoardContainer = styled.div`
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

export const BoardContent = styled.div`
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
