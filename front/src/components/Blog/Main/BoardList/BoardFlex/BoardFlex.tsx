/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { blog } from "types/BlogTypes/type";
import BoardItem from "../BoardItem";

interface IBoardFlex {
  blogFlex: blog[];
}

// mq({
//     maxWidth: ["1349px", "1006px", "663px", "320px"],
//   })

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
  max-width: 1692px;

  a {
    color: black;
    text-decoration: none;
  }

  /* 미디어 쿼리 */
  @media (max-width: 1738px) {
    max-width: 1349px;
  }
  @media (max-width: 1395px) {
    max-width: 1006px;
  }
  @media (max-width: 1052px) {
    max-width: 663px;
  }
  @media (max-width: 709px) {
    max-width: 320px;
  }
`;

export default BoardFlex;
