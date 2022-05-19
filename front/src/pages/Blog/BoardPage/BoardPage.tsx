import Header from "components/common/header";
import { useParams } from "react-router-dom";
import Board from "components/Blog/Board";

const BoardPage = () => {
  const { idx } = useParams();

  return (
    <>
      <Board idx={idx} />
    </>
  );
};

export default BoardPage;
