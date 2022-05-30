import BlogAPI from "assets/API/BlogAPI";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BoardList from "../Main/BoardList";
import { SearchBoardContainer } from "./SearchBoardStyle";

const SearchBoard = () => {
  const { getSearchBlog } = new BlogAPI();
  const { q } = useParams();
  const { data: { data } = {} } = useQuery(`search/${q}`, () =>
    getSearchBlog(q)
  );

  return (
    <SearchBoardContainer>
      {data && <BoardList blogList={data} />}
    </SearchBoardContainer>
  );
};

export default SearchBoard;
