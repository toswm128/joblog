import useBlogAPI from "assets/API/useBlogAPI";
import BoardList from "components/common/NewBlogs/BoardList";
import { NewBlogsContainer } from "components/common/NewBlogs/MainPageStyle";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import MainLoader from "../Loader/MainLoader";
import Modal from "../Modal";

interface INewBlogs {
  isModal?: boolean;
  showModal?: (status?: number | undefined) => void;
  closeModal?: () => void;
  breakpoints: number[];
}

const NewBlogs = ({
  isModal,
  showModal,
  closeModal,
  breakpoints,
}: INewBlogs) => {
  const { getBlog } = useBlogAPI();
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

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView]);

  return (
    <div>
      <NewBlogsContainer>
        {isLoading || isError ? (
          <MainLoader />
        ) : (
          <BoardList
            breakpoints={breakpoints}
            blogList={data?.pages.reduce((acc, { data: cur }) => {
              if (acc.data !== cur) return [...acc, ...cur];
              else return acc.data;
            }, data?.pages[0])}
          />
        )}
        <MainLoader />
        <div ref={ref}></div>
      </NewBlogsContainer>
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

export default NewBlogs;
