import { myBreakPoints } from "assets/breakpoints/breakpoints";
import BoardList from "components/common/NewBlogs/BoardList";
import MainLoader from "components/common/Loader/MainLoader";
import { blog } from "types/BlogTypes/type";
import { UserBoardsContainer } from "../InfoStyle";
import ViewObserver from "components/common/ViewObserver";

interface IUserBoards {
  isFetching: boolean;
  borders: blog[];
  fetchNextPage: () => any;
  isEnd: boolean;
}

const UserBoards = ({
  isFetching,
  borders,
  fetchNextPage,
  isEnd,
}: IUserBoards) => {
  return (
    <UserBoardsContainer>
      {isFetching ? (
        <MainLoader />
      ) : (
        <>
          {borders && (
            <BoardList
              blogList={borders}
              breakpoints={myBreakPoints}
              isEnd={isEnd}
            >
              <ViewObserver observerFuc={fetchNextPage} />
            </BoardList>
          )}
        </>
      )}
    </UserBoardsContainer>
  );
};

export default UserBoards;
