import useBlogAPI from "assets/API/useBlogAPI";
import MainLoader from "components/common/Loader/MainLoader";
import Modal from "components/common/Modal";
import useModal from "hooks/modal";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import BoardList from "./BoardList";
import { MainContainer } from "./MainPageStyle";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Main = () => {
  const { getBlog } = useBlogAPI();
  const { isModal, showModal, closeModal } = useModal(false);
  const navigate = useNavigate();
  const [ref, inView] = useInView();

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    "getBoard",
    ({ pageParam = 0 }) => getBlog(pageParam),
    {
      onError: showModal,
      select: data => data,
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    }
  );

  console.log(inView);

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView]);

  data && console.log([...data.pages]);

  return (
    <div>
      <MainContainer>
        {isLoading || isError ? (
          <MainLoader />
        ) : (
          data?.pages.map(({ data }) => <BoardList blogList={data} />)
        )}
        <MainLoader />
      </MainContainer>
      <Modal
        isModal={isModal}
        title={"⚠️ Warning! ⚠️"}
        buttonText={"새로고침"}
        btnClick={() => navigate(0)}
        backgroundClick={closeModal}
      >
        <>좆됐습니다!!</>
      </Modal>
    </div>
  );
};

export default Main;
