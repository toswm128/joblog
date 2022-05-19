import BlogAPI from "assets/API/BlogAPI";
import { useQuery, useQueryClient } from "react-query";
import BoardContext from "./BoardContext";
import { BoardContainer, BoardContent } from "./BoardStyle";
import Loader from "components/common/Loader";
import CommentForm from "./Comment/CommentForm";
import CommentList from "./Comment/CommentList";
import Divider from "components/common/Divider";
import Main from "../Main";
import BoardHeader from "./BoardHeader";

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
            <BoardHeader
              title={board.data.blog.title}
              profile={board.data.user.profile}
              name={board.data.user.name}
              regdate={board.data.blog.regdate}
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
    </BoardContainer>
  );
};

export default Board;
