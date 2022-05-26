import BlogAPI from "assets/API/BlogAPI";
import MainLoader from "components/common/Loader/MainLoader";
import Modal from "components/common/Modal";
import useModal from "hooks/modal";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import BoardList from "./BoardList";
import { MainContainer } from "./MainPageStyle";

const Main = () => {
  const { getBlog } = new BlogAPI();
  const { isModal, showModal, closeModal } = useModal(false);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery("getBoard", getBlog, {
    onError: showModal,
    retry: false,
  });
  return (
    <MainContainer>
      {isLoading || isError ? (
        <MainLoader />
      ) : (
        <BoardList blogList={data?.data.data} />
      )}
      {isModal && (
        <Modal
          title={"⚠️ Warning! ⚠️"}
          context={"좆됐습니다!!"}
          buttonText={"새로고침"}
          btnClick={() => navigate(0)}
        />
      )}
    </MainContainer>
  );
};

export default Main;
