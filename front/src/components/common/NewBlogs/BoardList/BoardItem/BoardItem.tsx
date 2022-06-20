import React, { memo } from "react";
import { BoardItemContainer, BoardItemContent } from "./BoardItemStyle";

import { blog } from "types/BlogTypes/type";

interface IBoardItem {
  data?: blog;
}

const BoardItem = memo(({ data }: IBoardItem) => {
  return (
    <BoardItemContainer>
      <img src={data?.banner} alt="" />
      <BoardItemContent>
        <div className="BoardIitle">{data?.title}</div>

        <div className="BoardWriter">{data?.name}</div>
        <div className="boardDate">{data?.regdate}</div>
      </BoardItemContent>
    </BoardItemContainer>
  );
});

export default BoardItem;
