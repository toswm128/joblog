import NewBlogs from "components/common/NewBlogs";
import { defaultBreakPoints } from "assets/breakpoints/breakpoints";
import useBlogAPI from "assets/API/useBlogAPI";

const Main = () => {
  const { getBlog } = useBlogAPI();
  return (
    <NewBlogs
      breakpoints={defaultBreakPoints}
      infiniteFuc={getBlog}
      querykey={"blogs"}
    />
  );
};

export default Main;
