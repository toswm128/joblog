import BlogAPI from "assets/API/BlogAPI";
import { useQuery } from "react-query";
import { blog } from "Store/BlogStore/type";
import BoardList from "./BoardList";
import { MainContainer } from "./MainPageStyle";

const Main = () => {
  const { getBlog } = new BlogAPI();
  const { data, isLoading } = useQuery("getBoard", getBlog);
  return (
    <MainContainer>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <BoardList blogList={data?.data.data} />
      )}
    </MainContainer>
  );
};

export default Main;
