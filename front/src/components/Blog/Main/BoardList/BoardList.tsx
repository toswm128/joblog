import BoardItem from "components/Blog/Main/BoardList/BoardItem";
import MainLoader from "components/common/Loader/MainLoader";
import React from "react";
import { Link } from "react-router-dom";
import { blog } from "types/BlogTypes/type";

interface IBoardList {
  blogList: blog[];
}

const BoardList = ({ blogList }: IBoardList) => {
  return (
    <>
      {blogList.map((current: blog) => (
        <Link to={`/board/${current.idx}`} key={current.idx}>
          <BoardItem data={current} />
        </Link>
      ))}
      <MainLoader />
    </>
  );
};

export default BoardList;
