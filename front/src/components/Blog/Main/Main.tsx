import useBlogAPI from "assets/API/useBlogAPI";
import MainLoader from "components/common/Loader/MainLoader";
import Modal from "components/common/Modal";
import useModal from "hooks/modal";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import BoardList from "./BoardList";
import { MainContainer } from "./MainPageStyle";

const Main = () => {
  const { getBlog } = useBlogAPI();
  const { isModal, showModal, closeModal } = useModal(false);
  const navigate = useNavigate();

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    "getBoard",
    ({ pageParam = 0 }) => getBlog(pageParam),
    {
      onError: showModal,
      select: data => data,
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    }
  );

  console.log(data?.pages);

  return (
    <MainContainer>
      {isLoading || isError ? (
        <MainLoader />
      ) : (
        data?.pages.map(({ data }) => <BoardList blogList={data} />)
      )}
      <button
        onClick={() => {
          fetchNextPage();
        }}
      >
        다시
      </button>
      <Modal
        isModal={isModal}
        title={"⚠️ Warning! ⚠️"}
        buttonText={"새로고침"}
        btnClick={() => navigate(0)}
        backgroundClick={closeModal}
      >
        <>좆됐습니다!!</>
      </Modal>
    </MainContainer>
  );
};

export default Main;
