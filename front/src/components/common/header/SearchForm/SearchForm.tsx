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
    isSuccess,
  } = useQuery<any, AxiosError>(`search/${title}`, () => getSearchBlog(title), {
    retry: false,
    enabled: false,
    onError: err => err.response?.status === 404 && setErrText(title),
  });

  return (
    <SearchFormContainer
      onBlur={e =>
        !e.currentTarget.contains(e.relatedTarget) && setIsModal(false)
      }
    >
      <SearchFormComponent
        style={
          isModal && title && (isSuccess || isError)
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
              }
            }, 800);
            setTimer(newTimer);
          }}
          onClick={() => !isModal && setIsModal(true)}
          onKeyDown={e => e.key === "Escape" && setIsModal(false)}
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
        setIsModal={setIsModal}
      />
    </SearchFormContainer>
  );
};

export default SearchForm;
