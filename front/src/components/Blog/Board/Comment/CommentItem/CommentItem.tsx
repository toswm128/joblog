import { comment } from "pages/Blog/BoardPage/type";
import { CommentItemContainer } from "./CommentStyle";

const CommentItem = ({ text, profile, name, regdate }: comment) => {
  return (
    <CommentItemContainer>
      <div className="comment-info">
        <img src={profile} alt="" />
        <div className="comment-info-content">
          <div className="comment-title">{name}</div>
          <div className="comment-date">{regdate}</div>
        </div>
      </div>
      <div className="comment-content">{text}</div>
    </CommentItemContainer>
  );
};

export default CommentItem;
