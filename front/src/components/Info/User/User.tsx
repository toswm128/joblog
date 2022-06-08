import useBlogAPI from "assets/API/useBlogAPI";
import { AxiosError } from "axios";
import Modal from "components/common/Modal";
import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { InfoContainer } from "../InfoStyle";
import UserBoards from "../UserBoards";
import UserInfo from "./UserInfo";

const User = () => {
  const { userIdx } = useParams();

  const { GetUser2UserIdx } = useAuthAPI();
  const { GetBlog2UserIdx } = useBlogAPI();
  const { isModal, showModal, closeModal, status } = useModal(false);

  const {
    data: { data: userInfo } = {},
    isFetching: isUserInfoFetching,
    isError: isUserInfoError,
  } = useQuery(`userInfo/${userIdx}`, () => GetUser2UserIdx(userIdx), {
    onError: (error: AxiosError) => {
      showModal(error.response?.status);
    },
  });
  const { data: { data: userBoard } = {}, isFetching: isBoardFetching } =
    useQuery(`userBoard/${userIdx}`, () => GetBlog2UserIdx(userIdx));

  const navigate = useNavigate();

  return (
    <InfoContainer>
      <UserInfo
        isFetching={isUserInfoFetching || isBoardFetching || isUserInfoError}
        info={userInfo}
      />
      <UserBoards
        isFetching={isUserInfoFetching || isBoardFetching || isUserInfoError}
        borders={userBoard}
      />
      <Modal
        isModal={isModal}
        title={"Error"}
        buttonText={"새로고침"}
        btnClick={() => navigate(0)}
        backgroundClick={() => closeModal()}
      >
        <>
          {status >= 500 && "서버 에러."}
          {status === 0 && "인터넷 상태가 불안정 합니다."}
        </>
      </Modal>
    </InfoContainer>
  );
};

export default User;
