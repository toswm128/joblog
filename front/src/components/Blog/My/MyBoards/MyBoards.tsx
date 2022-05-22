import { useQuery } from "react-query";

import BlogAPI from "assets/API/BlogAPI";

import BoardList from "components/Blog/Main/BoardList";
import { MyBoardsContainer } from "../MyStyle";

const MyBoards = () => {
  const { getBlog } = new BlogAPI();
  const { data, isLoading } = useQuery("getBoard", getBlog);
  return (
    <MyBoardsContainer>
      {data && <BoardList blogList={data?.data.data} />}
    </MyBoardsContainer>
  );
};

export default MyBoards;
