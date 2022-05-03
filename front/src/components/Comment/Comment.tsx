import { comment } from "pages/DetailPage/type";
import { CommentContainer } from "./CommentStyle";

const Comment = ({ text, profile, name, regdate }: comment) => {
  return (
    <CommentContainer>
      <div className="comment-info">
        <img src={profile} alt="" />
        <div className="comment-info-content">
          <div className="comment-title">{name}</div>
          <div className="comment-date">{regdate}</div>
        </div>
      </div>
      <div className="comment-content">{text}</div>
    </CommentContainer>
  );
};

export default Comment;
