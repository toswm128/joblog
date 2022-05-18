import React from "react";
import { BoardItemContainer, BoardItemContent } from "./BoardItemStyle";
import heart from "assets/png/heart.png";
import comment from "assets/png/comment.png";
import { blog } from "Store/BlogStore/type";

const BoardItem = ({ data }: { data: blog | undefined }) => {
  return (
    <BoardItemContainer>
      <img src={data?.banner} alt="" />
      <BoardItemContent>
        <div className="BoardIitle">{data?.title}</div>
        <div className="BoardInfo">
          <div>
            <p>
              <img src={heart} alt="" />
              {data?.likes}
            </p>
            <p>
              <img src={comment} alt="" />
              댓글
            </p>
          </div>
          <div className="BoardWriter">{data?.name}</div>
        </div>
        <div className="boardDate">{data?.regdate}</div>
      </BoardItemContent>
    </BoardItemContainer>
  );
};

export default BoardItem;
