import { useEffect, useRef } from "react";
import { blog } from "types/BlogTypes/type";
import BoardFlex from "./BoardFlex";
import useBoardList from "./useBoardList";

interface IBoardList {
  blogList: blog[];
  breakpoints: number[];
}

const BoardList = ({ blogList, breakpoints }: IBoardList) => {
  const { getFlex, flexBlog, flex, flexData } = useBoardList();

  const thhis = () => {
    console.log(this);
  };

  thhis();

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
