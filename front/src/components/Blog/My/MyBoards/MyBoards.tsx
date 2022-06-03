import { useIsFetching, useQuery } from "react-query";

import useBlogAPI from "assets/API/useBlogAPI";

import BoardList from "components/Blog/Main/BoardList";
import { MyBoardsContainer } from "../MyStyle";
import Modal from "components/common/Modal";
import useModal from "hooks/modal";
import { useNavigate } from "react-router-dom";
import Loader from "components/common/Loader";

const MyBoards = () => {
  const { getBlog } = useBlogAPI();
  const { data: { data } = {} } = useQuery("getBoard", getBlog, {
    onError: () => showModal(),
  });

  const isFetchingMyInfo = useIsFetching("myInfo");

  const { isModal, showModal, closeModal } = useModal(false);

  const navigate = useNavigate();

  return (
    <>
      {!isFetchingMyInfo && (
        <MyBoardsContainer>
          {data && <BoardList blogList={data} />}
          <Modal
            isModal={isModal}
            title={"Error"}
            buttonText={"새로고침"}
            btnClick={() => navigate(0)}
            backgroundClick={() => closeModal()}
          >
            <>
              <div>error</div>
            </>
          </Modal>
        </MyBoardsContainer>
      )}
    </>
  );
};

export default MyBoards;
