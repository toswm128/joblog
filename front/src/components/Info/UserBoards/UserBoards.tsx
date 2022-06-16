import { myBreakPoints } from "assets/breakpoints/breakpoints";
import BoardList from "components/common/NewBlogs/BoardList";
import MainLoader from "components/common/Loader/MainLoader";
import { blog } from "types/BlogTypes/type";
import { UserBoardsContainer } from "../InfoStyle";

interface IUserBoards {
  isFetching: boolean;
  borders: blog[];
}

const UserBoards = ({ isFetching, borders }: IUserBoards) => {
  return (
    <UserBoardsContainer>
      {isFetching ? (
        <MainLoader />
      ) : (
        <>
          {borders && (
            <BoardList blogList={borders} breakpoints={myBreakPoints} />
          )}
        </>
      )}
    </UserBoardsContainer>
  );
};

export default UserBoards;
