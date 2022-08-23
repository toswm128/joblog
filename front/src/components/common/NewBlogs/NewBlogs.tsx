import BoardList from "components/common/NewBlogs/BoardList";
import { NewBlogsContainer } from "components/common/NewBlogs/MainPageStyle";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import MainLoader from "../Loader/MainLoader";
import ViewObserver from "../ViewObserver";
import useModal from "hooks/modal";
import { AxiosError } from "axios";

interface INewBlogs {
  querykey: string;
  breakpoints: number[];
  infiniteFuc: (page: number) => any;
}

const NewBlogs = ({ querykey, breakpoints, infiniteFuc }: INewBlogs) => {
  const { openModal } = useModal();
  const [isEnd, setIsEnd] = useState(false);
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    querykey,
    ({ pageParam = 0 }) => infiniteFuc(pageParam),
    {
      onError: (error: AxiosError) =>
        openModal("error", { status: error.response?.status }),
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
      {isLoading || isError ? (
        <MainLoader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default NewBlogs;
