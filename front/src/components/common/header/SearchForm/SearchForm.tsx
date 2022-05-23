import { SearchFormContainer } from "./SearchFormStyled";

const SearchForm = () => {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="검색어를 입력해 주세요" />
      <button>검색</button>
    </SearchFormContainer>
  );
};

export default SearchForm;
