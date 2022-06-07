import { AxiosError } from "axios";
import Modal from "components/common/Modal";
import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useIsFetching, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { InfoComponent } from "../../InfoStyle";
import Settings from "./Settings";

const InfoLoader = () => {
  return (
    <>
      <img style={{ backgroundColor: "#c4c4c4" }} />
      <div>
        <h2></h2>
      </div>
      <Settings />
    </>
  );
};

const MyInfo = () => {
  const { GetUser } = useAuthAPI();

  const isFetchingGetBoard = useIsFetching("getBoard");

  const {
    data: { data } = {},
    isFetching,
    isError,
  } = useQuery("myInfo", GetUser, {
    onError: (error: AxiosError) => {
      showModal(error.response?.status);
      console.log(error.response?.status);
    },
  });

  const { isModal, showModal, closeModal, status } = useModal(false);

  const navigate = useNavigate();

  return (
    <>
      <InfoComponent>
        {isFetchingGetBoard || isFetching || isError ? (
          <InfoLoader />
        ) : (
          <>
            <img src={data?.profile} alt="" />
            <div>
              <h2>{data?.name}</h2>
            </div>
            <Settings />
          </>
        )}
      </InfoComponent>
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
    </>
  );
};

export default MyInfo;
