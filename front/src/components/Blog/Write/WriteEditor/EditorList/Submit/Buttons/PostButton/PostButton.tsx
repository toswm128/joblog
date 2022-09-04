import useBlogAPI from "assets/API/useBlogAPI";
import DefaultButton from "components/common/Buttons/DefaultButton";
import useWrite from "hooks/write/useWrite";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const PostButton = ({ dom }: { dom: any[] }) => {
  const {
    WriteEditorState: { title, banner },
    reset,
  } = useWrite();
  const { postBoard } = useBlogAPI();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <DefaultButton
      onClick={() => {
        title &&
          postBoard(dom, title, banner).then(() => {
            queryClient.refetchQueries("blogs");
            reset();
            navigate("/");
          });
      }}
      isAbled={title ? true : false}
      size={"M"}
    >
      <>작성하기</>
    </DefaultButton>
  );
};

export default PostButton;
