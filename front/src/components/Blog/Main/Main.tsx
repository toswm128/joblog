import BlogAPI from "assets/API/BlogAPI";
import MainLoader from "components/common/Loader/MainLoader";
import { useQuery } from "react-query";
import BoardList from "./BoardList";
import { MainContainer } from "./MainPageStyle";

const Main = () => {
  const { getBlog } = new BlogAPI();
  const { data, isLoading } = useQuery("getBoard", getBlog);
  return (
    <MainContainer>
      {isLoading ? <MainLoader /> : <BoardList blogList={data?.data.data} />}
    </MainContainer>
  );
};

export default Main;
