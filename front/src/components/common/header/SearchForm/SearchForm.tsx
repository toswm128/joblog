import BlogAPI from "assets/API/BlogAPI";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  SearchDataList,
  SearchFormComponent,
  SearchFormContainer,
} from "./SearchFormStyled";

const SearchForm = () => {
  const [title, setTitle] = useState("");
  const { getSearchBlog } = new BlogAPI();

  const { data, isSuccess } = useQuery(
    `search/${title}`,
    () => getSearchBlog(title),
    {
      retry: false,
    }
  );

  isSuccess && console.log(data?.data.data);

  return (
    <SearchFormContainer>
      <SearchFormComponent
        style={data && { borderBottom: "0px", borderRadius: "20px 20px 0 0" }}
      >
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
          <Link
            to={`/board/${current.idx}`}
            key={current.idx}
            onClick={() => setTitle("")}
          >
            {current.title}
          </Link>
        ))}
      </SearchDataList>
    </SearchFormContainer>
  );
};

export default SearchForm;
