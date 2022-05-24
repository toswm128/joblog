import BlogAPI from "assets/API/BlogAPI";
import { AxiosError } from "axios";
import HearderSearchErr from "components/common/Error/HearderSearchErr";
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
    isError,
  } = useQuery<any, AxiosError>(`search/${title}`, () => getSearchBlog(title), {
    retry: false,
    enabled: false,
    onError: err => err.response?.status === 404 && console.log("검색어 없음"),
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
        {isError && <HearderSearchErr searchData={title} />}
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
