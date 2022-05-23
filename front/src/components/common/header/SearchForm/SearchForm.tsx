import BlogAPI from "assets/API/BlogAPI";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  SearchDataList,
  SearchFormComponent,
  SearchFormContainer,
} from "./SearchFormStyled";

const SearchForm = () => {
  const [title, setTitle] = useState("");
  const { getSearchBlog } = new BlogAPI();

  const { data } = useQuery(`search/${title}`, () => getSearchBlog(title), {
    retry: false,
  });
  console.log(data?.data.data);

  return (
    <SearchFormContainer>
      <SearchFormComponent>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="검색어를 입력해 주세요"
        />
        <button>검색</button>
      </SearchFormComponent>
      <SearchDataList>
        {data?.data.data.map((current: any) => (
          <div key={current.idx}>{current.title}</div>
        ))}
      </SearchDataList>
    </SearchFormContainer>
  );
};

export default SearchForm;
