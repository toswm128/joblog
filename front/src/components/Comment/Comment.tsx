import React from "react";
import { CommentContainer } from "./CommentStyle";

const Comment = () => {
  return (
    <CommentContainer>
      <div className="comment-info">
        <img
          src="https://thumbs.gfycat.com/UnluckyQualifiedArabianwildcat-size_restricted.gif"
          alt=""
        />
        <div className="comment-info-content">
          <div className="comment-title">조민수</div>
          <div className="comment-date">2020.02.12</div>
        </div>
      </div>
      <div className="comment-content">내용이 아주 실하네요...</div>
    </CommentContainer>
  );
};

export default Comment;
