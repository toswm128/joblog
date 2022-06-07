import BoardList from "components/Blog/Main/BoardList";
import MainLoader from "components/common/Loader/MainLoader";
import { blog } from "types/BlogTypes/type";
import { UserBoardsContainer } from "../../InfoStyle";

export const UserBoardsLoader = () => {
  return (
    <UserBoardsContainer>
      <MainLoader />
    </UserBoardsContainer>
  );
};

interface IUserBoards {
  borders: blog[];
}

const UserBoards = ({ borders }: IUserBoards) => {
  return (
    <UserBoardsContainer>
      {borders && <BoardList blogList={borders} />}
    </UserBoardsContainer>
  );
};

export default UserBoards;
