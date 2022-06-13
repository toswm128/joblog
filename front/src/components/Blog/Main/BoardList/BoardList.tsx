import BoardItem from "components/Blog/Main/BoardList/BoardItem";
import MainLoader from "components/common/Loader/MainLoader";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blog } from "types/BlogTypes/type";
import BoardFlex from "./BoardFlex/BoardFlex";

interface IBoardList {
  blogList: blog[];
}

const breakpoints = [709, 1052, 1395, 1738];
function getWindowDimensions() {
  const { innerWidth: width } = window;
  let flex = 1;
  breakpoints.map((point, index) => {
    if (point <= width) flex = index + 2;
  });

  return flex;
}

const BoardList = ({ blogList }: IBoardList) => {
  const [flex, setFlex] = useState(0);
  const [flexData, setFlexData] = useState<blog[][]>([[]]);

  useEffect(() => {
    const handleResize = () => {
      setFlex(getWindowDimensions());
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFlexData(flexBlog());
  }, [flex]);

  const flexBlog = () => {
    if (flex) {
      const flexBlogs = [];
      for (let i = 0; i < Math.floor(blogList.length / flex); i++) {
        flexBlogs.push(blogList.slice(i * flex, flex * (i + 1)));
      }
      return flexBlogs;
    }
    return [[]];
  };

  return (
    <>
      {flexData.map((current: blog[], key: number) => (
        <BoardFlex blogFlex={current} key={key} />
      ))}
    </>
  );
};

// <Link to={`/board/${current.idx}`} key={current.idx}>
//   <BoardItem data={current} />
// </Link>
export default BoardList;
