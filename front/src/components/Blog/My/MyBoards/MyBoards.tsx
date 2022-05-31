import { useQuery } from "react-query";

import useBlogAPI from "assets/API/useBlogAPI";

import BoardList from "components/Blog/Main/BoardList";
import { MyBoardsContainer } from "../MyStyle";

const MyBoards = () => {
  const { getBlog } = useBlogAPI();
  const { data: { data } = {} } = useQuery("getBoard", getBlog);
  return (
    <MyBoardsContainer>
      {data && <BoardList blogList={data} />}
    </MyBoardsContainer>
  );
};

export default MyBoards;
