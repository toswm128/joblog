import BlogAPI from "assets/API/BlogAPI";
import MainLoader from "components/common/Loader/MainLoader";
import Modal from "components/common/Modal";
import { useQuery } from "react-query";
import BoardList from "./BoardList";
import { MainContainer } from "./MainPageStyle";

const Main = () => {
  const { getBlog } = new BlogAPI();
  const { data, isLoading, isSuccess, isError } = useQuery(
    "getBoard",
    getBlog,
    {
      retry: false,
    }
  );
  console.log(isSuccess, isError, isLoading);
  return (
    <MainContainer>
      {isLoading || isError ? (
        <MainLoader />
      ) : (
        <BoardList blogList={data?.data.data} />
      )}
      <Modal />
    </MainContainer>
  );
};

export default Main;
