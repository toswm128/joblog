import Divider from "components/common/Divider";
import { comments } from "pages/Blog/BoardPage/type";
import Comment from "../CommentItem";
import { CommentListContainer } from "./CommentListStyle";

interface ICommentList {
  commentList: comments;
}

const CommentList = ({ commentList }: ICommentList) => {
  return (
    <CommentListContainer>
      {commentList.length ? (
        <>
          <Divider>
            <>{commentList.length}개의 댓글</>
          </Divider>
          {commentList.map((comment, key) => (
            <Comment
              key={key}
              text={comment.text}
              profile={comment.profile}
              name={comment.name}
              regdate={comment.regdate}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </CommentListContainer>
  );
};

export default CommentList;
