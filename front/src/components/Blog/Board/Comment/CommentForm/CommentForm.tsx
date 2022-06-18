import useAuthAPI from "hooks/API/useAuthAPI";
import useBlogAPI from "assets/API/useBlogAPI";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import ReactTextareaAutosize from "react-textarea-autosize";
import { CommentFormContainer } from "./CommentFormStyle";
import DefaultButton from "components/common/Buttons/DefaultButton";

interface ICommentForm {
  blogIdx: number;
}

const CommentForm = ({ blogIdx }: ICommentForm) => {
  const { GetUser } = useAuthAPI();

  const { data: { data } = {} } = useQuery("myInfo", GetUser);

  const { postComment } = useBlogAPI();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  return (
    <CommentFormContainer>
      <div>
        <img className="profilImg" src={data?.profile} alt="" />
        <ReactTextareaAutosize
          className="commentTextarea"
          spellCheck={false}
          minRows={2}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력해 주세요"
        />
      </div>
      <div>
        <DefaultButton
          onClick={async () => {
            await postComment(blogIdx, commentText);
            setCommentText("");
            queryClient.invalidateQueries(`board/${blogIdx}`);
          }}
          isAbled={true}
          size={"M"}
        >
          <>작성하기</>
        </DefaultButton>
      </div>
    </CommentFormContainer>
  );
};

export default CommentForm;
