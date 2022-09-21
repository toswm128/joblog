import useBlogAPI from "assets/API/useBlogAPI";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useWrite from "hooks/write/useWrite";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useModal from "hooks/modal";

const useBoardSetting = (idx: string) => {
  const { putSetUp } = useWrite();
  const { getBoard, deleteBoard } = useBlogAPI();
  const { closeModal, openModal } = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: { data: board } = {} } = useQuery(
    `board/${idx}`,
    () => getBoard(idx),
    {}
  );
  queryClient.getQueryData(`board/${idx}`);
  const { mutate } = useMutation(() => deleteBoard(idx), {
    onSuccess: () => {
      queryClient.invalidateQueries(`blogs`);
      navigate(`/`);
      closeModal();
    },
    onError: (error: AxiosError) => {
      closeModal();
      openModal("error", { status: error?.response?.status });
    },
  });

  const putBoard = () => {
    const context = JSON.parse(board?.blog?.context);
    const body = context.map((item: any, key: any) => {
      item.id = key;
      if (context.length - 1 !== key) {
        item.next = key + 1;
      } else {
        item.next = null;
      }
      if (key !== 0) {
        item.prev = key - 1;
      } else {
        item.prev = null;
      }

      return item;
    });
    putSetUp(body, board?.blog?.title, idx);

    navigate("/write");
    closeModal();
  };

  const removeBoard = () => {
    mutate();
  };
  return { putBoard, removeBoard };
};

export default useBoardSetting;
