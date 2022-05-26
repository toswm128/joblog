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
      retry: false,
      onError: () => showModal(),
    }
  );

  return (
    <BoardContainer>
      {!isLoading && board ? (
        <>
          <img className="banner" src={board.data.blog.banner} alt="" />
          <BoardContent>
            <BoardHeader
              idx={idx}
              title={board.data.blog.title}
              profile={board.data.user.profile}
              name={board.data.user.name}
              regdate={board.data.blog.regdate}
              likes={board.data.likes}
            />
            <div className="content">
              <BoardContext context={board.data.blog.context} />
            </div>
            <CommentForm blogIdx={board.data.blog.idx} />
            <CommentList commentList={board.data.comments} />
            <Divider>
              <>다른 게시글</>
            </Divider>
            <Main />
          </BoardContent>
        </>
      ) : (
        <Loader />
      )}
      {isModal && (
        <Modal
          title={"⚠️ Warning! ⚠️"}
          context={"좆됐습니다!"}
          buttonText={"새로고침"}
          btnClick={() => navigate(0)}
        />
      )}
    </BoardContainer>
  );
};

export default Board;
