import BlogAPI from "assets/API/BlogAPI";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { SearchFormComponent, SearchFormContainer } from "./SearchFormStyled";
import SearchModal from "./SearchModal";

const SearchForm = () => {
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { getSearchBlog } = new BlogAPI();
  const [isModal, setIsModal] = useState(false);
  const [errText, setErrText] = useState("");
  const [selectIdx, setSelectIdx] = useState(-1);
  const navigate = useNavigate();

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

  const debounceSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(async () => {
      if (e.target.value) {
        await refetch();
        setIsModal(true);
      }
    }, 800);
    setTimer(newTimer);
  };

  const selectSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate(`/board/${data?.data[selectIdx].idx}`);
    setIsModal(false);
    setSelectIdx(-1);
  };

  const KeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Escape":
        setIsModal(false);
        break;
      case "ArrowDown":
        selectIdx < data?.data.length - 1
          ? setSelectIdx(prev => prev + 1)
          : setSelectIdx(0);
        break;
      case "ArrowUp":
        selectIdx > 0
          ? setSelectIdx(prev => prev - 1)
          : setSelectIdx(data?.data.length - 1);
        break;
      case "Enter":
        selectIdx >= 0 && selectSearch(e);
        console.log(selectIdx, e.key);
    }
  };

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
          console.log("submit");
        }}
      >
        <input
          value={title}
          onChange={e => debounceSearch(e)}
          onClick={() => !isModal && setIsModal(true)}
          onKeyDown={e => KeyDownSearch(e)}
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
        selectIdx={selectIdx}
        setIsModal={setIsModal}
      />
    </SearchFormContainer>
  );
};

export default SearchForm;
