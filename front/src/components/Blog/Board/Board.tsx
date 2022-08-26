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
import useAuthAPI from "hooks/API/useAuthAPI";
import { useEffect, useState } from "react";

interface IBoard {
  idx: string;
}

const Board = ({ idx }: IBoard) => {
  const [isMyBoard, setIsMyBoard] = useState(false);
  const { getBoard, getBlog } = useBlogAPI();
  const { GetUser } = useAuthAPI();
  const { data: { data: info } = {} } = useQuery("myInfo", GetUser);

  const { isLoading, data: { data: board } = {} } = useQuery(
    `board/${idx}`,
    () => getBoard(idx),
    {}
  );

  useEffect(() => {
    board?.blog?.userIdx ??
      info?.idx ??
      setIsMyBoard(board?.blog?.userIdx === info?.idx);
  }, [board?.blog, info?.idx]);

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
