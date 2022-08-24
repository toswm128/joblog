import useBlogAPI from "assets/API/useBlogAPI";
import { useQuery } from "react-query";
import BoardContext from "./BoardContext";
import { BoardContainer, BoardContent, OtherBlogs } from "./BoardStyle";
import Loader from "components/common/Loader";
import CommentForm from "./Comment/CommentForm";
import CommentList from "./Comment/CommentList";
import Divider from "components/common/Divider";
import BoardHeader from "./BoardHeader";
import NewBlogs from "components/common/NewBlogs";
import { anotherBreakPoints } from "assets/breakpoints/breakpoints";

interface IBoard {
  idx: string;
}

const Board = ({ idx }: IBoard) => {
  const { getBoard, getBlog } = useBlogAPI();

  const { isLoading, data: { data: board } = {} } = useQuery(
    `board/${idx}`,
    () => getBoard(idx),
    {}
  );

  return (
    <BoardContainer>
      {!isLoading && board ? (
        <>
          <img className="banner" src={board.blog.banner} alt="" />
          <BoardContent>
            <BoardHeader
              idx={idx}
              userIdx={board.user.idx}
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
          </BoardContent>
          <OtherBlogs>
            <Divider>
              <>다른 게시글</>
            </Divider>
            <NewBlogs
              breakpoints={anotherBreakPoints}
              infiniteFuc={getBlog}
              querykey={"blogs"}
            />
          </OtherBlogs>
        </>
      ) : (
        <Loader />
      )}
    </BoardContainer>
  );
};

export default Board;
