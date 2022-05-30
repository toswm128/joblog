import BlogAPI from "assets/API/BlogAPI";
import { useQuery } from "react-query";
import BoardContext from "./BoardContext";
import { BoardContainer, BoardContent } from "./BoardStyle";
import Loader from "components/common/Loader";
import CommentForm from "./Comment/CommentForm";
import CommentList from "./Comment/CommentList";
import Divider from "components/common/Divider";
import Main from "../Main";
import BoardHeader from "./BoardHeader";
import useModal from "hooks/modal";
import Modal from "components/common/Modal";
import { useNavigate } from "react-router-dom";

interface IBoard {
  idx: string;
}

const Board = ({ idx }: IBoard) => {
  const { isModal, showModal } = useModal(false);
  const navigate = useNavigate();
  const { getBoard } = new BlogAPI();
  const { isLoading, data: { data: board } = {} } = useQuery(
    `board/${idx}`,
    () => getBoard(idx),
    {
      onError: () => showModal(),
    }
  );


  return (
    <BoardContainer>
      {!isLoading && board ? (
        <>
          <img className="banner" src={board.blog.banner} alt="" />
          <BoardContent>
            <BoardHeader
              idx={idx}
              title={board.blog.title}
              profile={board.user.profile}
              name={board.user.name}
              regdate={board.blog.regdate}
              likes={board.likes}
            />
            <div className="content">
              <BoardContext context={board.blog.context} />
            </div>
            <CommentForm blogIdx={board.blog.idx} />
            <CommentList commentList={board.comments} />
            <Divider>
              <>다른 게시글</>
            </Divider>
            <Main />
          </BoardContent>
        </>
      ) : (
        <Loader />
      )}
      <Modal
        isModal={isModal}
        title={"⚠️ Warning! ⚠️"}
        buttonText={"새로고침"}
        btnClick={() => navigate(0)}
      >
        <>좆됐습니다!</>
      </Modal>
    </BoardContainer>
  );
};

export default Board;
