import useBlogAPI from "assets/API/useBlogAPI";
import { AxiosError } from "axios";
import DefaultButton from "components/common/Buttons/DefaultButton";
import useWrite from "hooks/write/useWrite";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useModal from "hooks/modal/useModal";

const PutButton = ({ dom }: { dom: any[] }) => {
  const {
    WriteEditorState: { title, banner, putId },
    reset,
  } = useWrite();
  const { putBoard } = useBlogAPI();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const { mutate } = useMutation(() => putBoard(dom, title, putId, banner), {
    onSuccess: () => {
      reset();
      navigate(`/board/${putId}`);
      queryClient.invalidateQueries(`board/${putId}`);
    },
    onError: (error: AxiosError) => {
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
      <>수정하기</>
    </DefaultButton>
  );
};

export default PutButton;
