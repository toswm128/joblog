import useBlogAPI from "assets/API/useBlogAPI";
import DefaultButton from "components/common/Buttons/DefaultButton";
import useWrite from "hooks/write/useWrite";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const PutButton = ({ dom }: { dom: any[] }) => {
  const {
    WriteEditorState: { title, banner, putId },
    reset,
  } = useWrite();
  const { putBoard } = useBlogAPI();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <DefaultButton
      onClick={() => {
        title &&
          putBoard(dom, title, putId, banner).then(() => {
            queryClient.refetchQueries("blogs");
            reset();
            navigate("/");
          });
      }}
      isAbled={title ? true : false}
      size={"M"}
    >
      <>수정하기</>
    </DefaultButton>
  );
};

export default PutButton;
