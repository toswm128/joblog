import BoardItem from "components/Blog/Board/BoardItem";
import React from "react";
import { Link } from "react-router-dom";
import { blog } from "Store/BlogStore/type";

interface IBoardList {
  blogList: blog[];
}

const BoardList = ({ blogList }: IBoardList) => {
  return (
    <>
      {blogList.map((current: blog, key: React.Key) => (
        <Link to={`/detail/${current.idx}`} key={key}>
          <BoardItem data={current} />
        </Link>
      ))}
    </>
  );
};

export default BoardList;
