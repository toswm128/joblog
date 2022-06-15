import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { blog } from "types/BlogTypes/type";
import BoardItem from "../BoardItem";

interface IBoardFlex {
  blogFlex: blog[];
}

const BoardFlex = ({ blogFlex }: IBoardFlex) => {
  return (
    <BoardFlexContainer>
      {blogFlex.map(current => (
        <Link to={`/board/${current.idx}`} key={current.idx}>
          <BoardItem data={current} />
        </Link>
      ))}
    </BoardFlexContainer>
  );
};

const BoardFlexContainer = styled.div`
  /* 레이아웃 */
  display: flex;
  gap: 23px;
  width: 100%;

  a {
    color: black;
    text-decoration: none;
  }
`;

export default BoardFlex;
