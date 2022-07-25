import NewBlogs from "components/common/NewBlogs";
import { defaultBreakPoints } from "assets/breakpoints/breakpoints";
import useBlogAPI from "assets/API/useBlogAPI";
import { NewBlogsContainer } from "components/common/NewBlogs/MainPageStyle";

const Main = () => {
  const { getBlog } = useBlogAPI();
  return (
    <NewBlogsContainer>
      <NewBlogs
        breakpoints={defaultBreakPoints}
        infiniteFuc={getBlog}
        querykey={"blogs"}
      />
    </NewBlogsContainer>
  );
};

export default Main;
