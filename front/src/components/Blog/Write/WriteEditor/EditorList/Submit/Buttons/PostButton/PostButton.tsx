import useBlogAPI from "assets/API/useBlogAPI";
import DefaultButton from "components/common/Buttons/DefaultButton";
import useWrite from "hooks/write/useWrite";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useModal from "hooks/modal/useModal";
import { AxiosError } from "axios";

const PostButton = ({ dom }: { dom: any[] }) => {
  const {
    WriteEditorState: { title, banner },
    reset,
  } = useWrite();

  const { postBoard } = useBlogAPI();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const { mutate } = useMutation(() => postBoard(dom, title, banner), {
    onSuccess: () => {
      reset();
      navigate("/");
      queryClient.invalidateQueries("blogs");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response?.status);
      openModal("error", { status: error?.response?.status });
    },
  });
  return (
    <DefaultButton
      onClick={() => {
        title && mutate();
      }}
      isAbled={title ? true : false}
      size={"M"}
    >
      <>작성하기</>
    </DefaultButton>
  );
};

export default PostButton;
