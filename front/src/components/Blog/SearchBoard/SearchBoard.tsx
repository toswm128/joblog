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

  console.log(data);

  return (
    <SearchBoardContainer>
      {data?.data && <BoardList blogList={data?.data} />}
    </SearchBoardContainer>
  );
};

export default SearchBoard;
