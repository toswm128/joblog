import React from "react";
import { BoardItemContainer, BoardItemContent } from "./BoardItemStyle";
import heart from "assets/png/heart.png";
import comment from "assets/png/comment.png";
const BoardItem = () => {
  return (
    <BoardItemContainer>
      <img
        src="https://3.bp.blogspot.com/-mPLdHCrx-Fs/X17EWTj9zrI/AAAAAAAAYSw/t19XT88JH7EuC6R3VmVHACfL-FGMnYKJgCLcBGAsYHQ/s1600/6_1.jpg"
        alt=""
      />
      <BoardItemContent>
        <div className="title">제목</div>
        <div className="info">
          <div>
            <p>
              <img src={heart} alt="" />
              좋아요
            </p>
            <p>
              <img src={comment} alt="" />
              댓글
            </p>
          </div>
          <div className="writer">작성자</div>
        </div>
        <div className="date">날짜</div>
      </BoardItemContent>
    </BoardItemContainer>
  );
};

export default BoardItem;
