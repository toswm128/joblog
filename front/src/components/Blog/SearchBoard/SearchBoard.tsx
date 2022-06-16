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
      <h2>
        <span>"{q}"</span>에 대한 검색 결과
      </h2>
      {data && (
        <BoardList
          blogList={data}
          isEnd={true}
          breakpoints={defaultBreakPoints}
        />
      )}
    </SearchBoardContainer>
  );
};

export default SearchBoard;
