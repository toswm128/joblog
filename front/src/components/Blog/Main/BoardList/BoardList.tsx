import { useEffect } from "react";
import { blog } from "types/BlogTypes/type";
import BoardFlex from "./BoardFlex";
import useBoardList from "./useBoardList";

interface IBoardList {
  blogList: blog[];
}

const breakpoints = [709, 1052, 1395, 1738];

const BoardList = ({ blogList }: IBoardList) => {
  const { getFlex, flexBlog, flex, flexData } = useBoardList();

  useEffect(() => {
    const handleResize = () => {
      getFlex(breakpoints);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    flexBlog(blogList);
  }, [flex, blogList]);

  return (
    <>
      {flexData.map((current: blog[], key: number) => (
        <BoardFlex blogFlex={current} key={key} />
      ))}
    </>
  );
};
export default BoardList;
