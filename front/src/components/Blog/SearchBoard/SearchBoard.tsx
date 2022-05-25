import BoardList from "../Main/BoardList";
import { SearchBoardContainer } from "./SearchBoardStyle";

const SearchBoard = () => {
  return (
    <SearchBoardContainer>
      <BoardList blogList={[]} />
    </SearchBoardContainer>
  );
};

export default SearchBoard;
