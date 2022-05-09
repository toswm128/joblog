import BlogAPI from "assets/API/BlogAPI";
import { useQuery } from "react-query";
import BoardContext from "./Content/BoardContext";
import { BoardContainer, BoardContent } from "./BoardStyle";
import heart from "assets/png/heart.png";
import Loader from "components/common/Loader";
import CommentForm from "./Comment/CommentForm";
import CommentList from "./Comment/CommentList";

interface IBoard {
  idx: string | undefined;
}

const Board = ({ idx }: IBoard) => {
  const { getBoard } = new BlogAPI();
  const { isLoading, data: { data: board } = {} } = useQuery(
    `board/${idx}`,
    () => getBoard(idx)
  );
  return (
    <BoardContainer>
      {!isLoading && board ? (
        <>
          <img className="banner" src={board.data.blog.banner} alt="" />
          <BoardContent>
            <div className="title">{board.data.blog.title}</div>
            <div className="info">
              <div className="profil">
                <img
                  className="profilImg"
                  src={board.data.user.profile}
                  alt=""
                />
                <p>{board.data.blog.regdate}</p>
              </div>
              <img src={heart} alt="" />
            </div>
            <div className="content">
              <BoardContext context={board.data.blog.context} />
            </div>
            <CommentForm blogIdx={board.data.blog.idx} />
            <CommentList commentList={board.data.comments} />
          </BoardContent>
        </>
      ) : (
        <Loader />
      )}
    </BoardContainer>
  );
};

export default Board;
