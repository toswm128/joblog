import { Link } from "react-router-dom";
import { blog } from "types/BlogTypes/type";
import { BoardFlexContainer } from "../../MainPageStyle";
import BoardItem from "../BoardItem";

interface IBoardFlex {
  blogFlex: blog[];
}

const BoardFlex = ({ blogFlex }: IBoardFlex) => {
  return (
    <BoardFlexContainer>
      {blogFlex.map((current) => (
        <Link to={`/board/${current.idx}`} key={current.idx}>
          <BoardItem data={current} />
        </Link>
      ))}
    </BoardFlexContainer>
  );
};

export default BoardFlex;
