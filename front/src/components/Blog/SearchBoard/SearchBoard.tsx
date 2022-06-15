import useBlogAPI from "assets/API/useBlogAPI";
import { defaultBreakPoints } from "assets/breakpoints/breakpoints";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BoardList from "../../common/NewBlogs/BoardList";
import { SearchBoardContainer } from "./SearchBoardStyle";

const SearchBoard = () => {
  const { getSearchBlog } = useBlogAPI();
  const { q } = useParams();
  const { data: { data } = {} } = useQuery(`search/${q}`, () =>
    getSearchBlog(q)
  );

  return (
    <SearchBoardContainer>
      {data && <BoardList blogList={data} breakpoints={defaultBreakPoints} />}
    </SearchBoardContainer>
  );
};

export default SearchBoard;
