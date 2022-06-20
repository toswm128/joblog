import { comment } from "pages/Blog/BoardPage/type";
import { CommentItemContainer } from "./CommentStyle";

const CommentItem = ({ text, profile, name, regdate }: comment) => {
  return (
    <CommentItemContainer>
      <img src={profile} alt="" />
      <div className="comment-info">
        <div className="comment-info-content">
          <div className="comment-title">{name}</div>
          <div className="comment-date">{regdate}</div>
        </div>
        <div className="comment-content">{text}</div>
      </div>
    </CommentItemContainer>
  );
};

export default CommentItem;
