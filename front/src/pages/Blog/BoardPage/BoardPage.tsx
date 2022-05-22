import { useParams } from "react-router-dom";
import Board from "components/Blog/Board";

const BoardPage = () => {
  const { idx } = useParams();

  return <>{idx && <Board idx={idx} />}</>;
};

export default BoardPage;
