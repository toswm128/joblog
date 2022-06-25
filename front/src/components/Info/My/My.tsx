import { InfoContainer } from "../InfoStyle";
import useAuthAPI from "hooks/API/useAuthAPI";
import useBlogAPI from "assets/API/useBlogAPI";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import useModal from "hooks/modal";
import { useNavigate } from "react-router-dom";
import Modal from "components/common/Modal";
import MyInfo from "./MyInfo";
import NewBlogs from "components/common/NewBlogs";
import { myBreakPoints } from "assets/breakpoints/breakpoints";

const My = () => {
  const { GetUser } = useAuthAPI();
  const { getMyBoard } = useBlogAPI();
  const { isModal, showModal, closeModal, status } = useModal(false);
  const navigate = useNavigate();

  const {
    data: { data: myInfo } = {},
    isFetching: isMyInfoFetching,
    isError: isMyInfoError,
  } = useQuery("myInfo", GetUser, {
    onError: (error: AxiosError) => {
      showModal(error.response?.status);
      console.log(error.response?.status);
    },
  });

  return (
    <InfoContainer>
      <MyInfo isFetching={isMyInfoFetching || isMyInfoError} info={myInfo} />
      <NewBlogs
        breakpoints={myBreakPoints}
        infiniteFuc={getMyBoard}
        querykey={"myBlogs"}
      />
      <Modal
        isModal={isModal}
        title={"Error"}
        buttonText={status === 403 ? "로그인 하러 가기" : "새로고침"}
        btnClick={() => {
          status === 403 ? navigate("/login") : navigate(0);
        }}
        backgroundClick={() => closeModal()}
      >
        <>
          {status >= 500 && "서버 에러."}
          {status === 403 && "로그인 이후 가능한 서비스 입니다."}
          {status === 0 && "인터넷 상태가 불안정 합니다."}
        </>
      </Modal>
    </InfoContainer>
  );
};

export default My;
