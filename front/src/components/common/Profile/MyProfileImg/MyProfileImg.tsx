import styled from "@emotion/styled";
import { Link } from "react-router-dom";

interface IMyProfileImg {
  src: string;
}

const MyProfileImg = ({ src }: IMyProfileImg) => {
  return (
    <MyProfileImgStyled>
      <Link to={`/my`}>
        <img src={src} alt="" />
      </Link>
    </MyProfileImgStyled>
  );
};

const MyProfileImgStyled = styled.div`
  width: 40px;
  height: 40px;
  & > a {
    width: 100%;
    height: 100%;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

export default MyProfileImg;
