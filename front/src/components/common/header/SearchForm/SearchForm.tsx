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
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { getSearchBlog } = new BlogAPI();

  const {
    refetch,
    data: { data } = {},
    isSuccess,
  } = useQuery(`search/${title}`, () => getSearchBlog(title), {
    retry: false,
    enabled: false,
  });

  return (
    <SearchFormContainer>
      <SearchFormComponent
        style={
          title
            ? {
                borderBottom: "0px",
                borderRadius: "20px 20px 0 0",
              }
            : {}
        }
        onSubmit={e => {
          e.preventDefault();
          refetch();
        }}
      >
        <input
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            if (timer) clearTimeout(timer);
            const newTimer = setTimeout(async () => await refetch(), 800);
            setTimer(newTimer);
          }}
          type="text"
          placeholder="검색어를 입력해 주세요"
        />
        <button>검색</button>
      </SearchFormComponent>
      <SearchDataList
        style={title ? { borderBottom: "1px solid #c4c4c4" } : {}}
      >
        {data?.data.map((current: any) => (
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
