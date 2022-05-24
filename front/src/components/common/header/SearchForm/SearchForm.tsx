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
import SearchModal from "./SearchModal";

const SearchForm = () => {
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { getSearchBlog } = new BlogAPI();
  const [isModal, setIsModal] = useState(false);
  const [errText, setErrText] = useState("");

  const {
    refetch,
    data: { data } = {},
    isError,
  } = useQuery<any, AxiosError>(`search/${title}`, () => getSearchBlog(title), {
    retry: false,
    enabled: false,
    onError: err => err.response?.status === 404 && setErrText(title),
  });

  return (
    <SearchFormContainer>
      <SearchFormComponent
        style={
          isModal
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
            const newTimer = setTimeout(async () => {
              if (e.target.value) {
                await refetch();
                setIsModal(true);
              }
            }, 800);
            setTimer(newTimer);
          }}
          type="text"
          placeholder="검색어를 입력해 주세요"
        />
        <button>검색</button>
      </SearchFormComponent>
      <SearchModal
        isError={isError}
        autoSearch={data?.data}
        isModal={isModal}
        errText={errText}
      />
    </SearchFormContainer>
  );
};

export default SearchForm;
