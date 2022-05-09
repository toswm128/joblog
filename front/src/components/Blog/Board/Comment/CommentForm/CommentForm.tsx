import BlogAPI from "assets/API/BlogAPI";
import { WriteButton } from "components/common/styleObject/ButtonStyle";
import { useState } from "react";
import { useQueryClient } from "react-query";
import ReactTextareaAutosize from "react-textarea-autosize";
import { CommentFormContainer } from "./CommentFormStyle";

interface ICommentForm {
  blogIdx: number;
}

const CommentForm = ({ blogIdx }: ICommentForm) => {
  const { postComment } = new BlogAPI();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  return (
    <CommentFormContainer>
      <div>
        <img
          className="profilImg"
          src="https://thumbs.gfycat.com/UnluckyQualifiedArabianwildcat-size_restricted.gif"
          alt=""
        />
        <ReactTextareaAutosize
          className="commentTextarea"
          spellCheck={false}
          minRows={2}
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="댓글을 입력해 주세요"
        />
      </div>
      <div>
        <WriteButton
          onClick={async () => {
            await postComment(blogIdx, commentText);
            setCommentText("");
            queryClient.invalidateQueries(`board/${blogIdx}`);
          }}
        >
          작성하기
        </WriteButton>
      </div>
    </CommentFormContainer>
  );
};

export default CommentForm;
