import { useIsFetching, useQuery } from "react-query";

import useBlogAPI from "assets/API/useBlogAPI";

import BoardList from "components/Blog/Main/BoardList";
import { MyBoardsContainer } from "../MyStyle";
import Modal from "components/common/Modal";
import useModal from "hooks/modal";
import { useNavigate } from "react-router-dom";
import Loader from "components/common/Loader";
import MainLoader from "components/common/Loader/MainLoader";

const MyBoards = () => {
  const { getMyBoard } = useBlogAPI();
  const {
    data: { data } = {},
    isFetching,
    isError,
  } = useQuery("getMyBoard", getMyBoard);

  const isFetchingMyInfo = useIsFetching("myInfo");

  return (
    <MyBoardsContainer>
      {isFetching || isFetchingMyInfo || isError ? (
        <MainLoader />
      ) : (
        <>{data && <BoardList blogList={data} />}</>
      )}
    </MyBoardsContainer>
  );
};

export default MyBoards;
