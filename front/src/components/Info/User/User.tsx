import useBlogAPI from "assets/API/useBlogAPI";
import { myBreakPoints } from "assets/breakpoints/breakpoints";
import { AxiosError } from "axios";
import Modal from "components/Modal";
import NewBlogs from "components/common/NewBlogs";
import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { InfoContainer, UserBoardsContainer } from "../InfoStyle";
import UserInfo from "./UserInfo";

const User = () => {
  const { userIdx } = useParams();
  const { GetUser2UserIdx } = useAuthAPI();
  const { GetBlog2UserIdx } = useBlogAPI();
  const navigate = useNavigate();

  const {
    data: { data: userInfo } = {},
    isFetching: isUserInfoFetching,
    isError: isUserInfoError,
  } = useQuery(`userInfo/${userIdx}`, () => GetUser2UserIdx(userIdx), {
    onError: (error: AxiosError) => {
      // showModal(error.response?.status);
    },
  });

  return (
    <InfoContainer>
      <UserInfo
        isFetching={isUserInfoFetching || isUserInfoError}
        info={userInfo}
      />
      <UserBoardsContainer>
        <NewBlogs
          breakpoints={myBreakPoints}
          infiniteFuc={(page) => GetBlog2UserIdx(userIdx, page)}
          querykey={`userBlogs/${userIdx}`}
        />
      </UserBoardsContainer>
    </InfoContainer>
  );
};

export default User;
