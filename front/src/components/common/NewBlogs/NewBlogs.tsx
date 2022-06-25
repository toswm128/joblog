import BoardList from "components/common/NewBlogs/BoardList";
import { NewBlogsContainer } from "components/common/NewBlogs/MainPageStyle";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import MainLoader from "../Loader/MainLoader";
import Modal from "../Modal";
import ViewObserver from "../ViewObserver";

interface INewBlogs {
  querykey: string;
  isModal?: boolean;
  showModal?: (status?: number | undefined) => void;
  closeModal?: () => void;
  breakpoints: number[];
  infiniteFuc: (page: number) => any;
}

const NewBlogs = ({
  querykey,
  isModal,
  showModal,
  closeModal,
  breakpoints,
  infiniteFuc,
}: INewBlogs) => {
  const navigate = useNavigate();
  const [isEnd, setIsEnd] = useState(false);
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    querykey,
    ({ pageParam = 0 }) => infiniteFuc(pageParam),
    {
      onError: showModal,
      select: (data) => data,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      onSuccess: ({ pages }) => {
        const last = pages[pages.length - 1];
        last.isEnd && setIsEnd(true);
      },
    }
  );

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
            isEnd={isEnd}
          >
            <ViewObserver observerFuc={fetchNextPage} />
          </BoardList>
        )}
      </NewBlogsContainer>
      <Modal
        isModal={isModal}
        title={"⚠️ Warning! ⚠️"}
        buttonText={"새로고침"}
        btnClick={() => navigate(0)}
        backgroundClick={closeModal}
      >
        <>인터넷 연결이 불안정 합니다.</>
      </Modal>
    </div>
  );
};

export default NewBlogs;
