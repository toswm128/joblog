import MainLoader from "components/common/Loader/MainLoader";
import { useEffect, useRef } from "react";
import { blog } from "types/BlogTypes/type";
import { BoardFlexContainer } from "../MainPageStyle";
import BoardFlex from "./BoardFlex";
import useBoardList from "./useBoardList";

interface IBoardList {
  blogList: blog[];
  breakpoints: number[];
  children?: JSX.Element;
  isEnd?: boolean;
}

const BoardList = ({ blogList, breakpoints, children, isEnd }: IBoardList) => {
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
    flexBlog(blogList, isEnd);
  }, [flex, blogList]);

  return (
    <>
      {flexData.map((current: blog[], key: number) => (
        <BoardFlex blogFlex={current} key={key} />
      ))}

      {!isEnd && flex && children}
      {!isEnd && (
        <BoardFlexContainer>
          <MainLoader flex={flex} />
        </BoardFlexContainer>
      )}
    </>
  );
};
export default BoardList;
