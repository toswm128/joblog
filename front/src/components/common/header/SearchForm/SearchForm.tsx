import useBlogAPI from "assets/API/useBlogAPI";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";
import { SearchFormComponent, SearchFormContainer } from "./SearchFormStyled";
import SearchModal from "./SearchModal";
import useSearchForm from "./useSearchForm";

const SearchForm = () => {
  const [title, setTitle] = useState("");
  const { getSearchBlog } = useBlogAPI();
  const navigate = useNavigate();
  const {
    refetch,
    data: { data } = {},
    isError,
    isSuccess,
  } = useQuery<any, AxiosError>(`search/${title}`, () => getSearchBlog(title), {
    enabled: false,
    onError: (err) => err.response?.status === 404 && setErrText(title),
  });

  const {
    debounceSearch,
    KeyDownSearch,
    setErrText,
    selectIdx,
    errText,
    isModal,
    setIsModal,
  } = useSearchForm(refetch, data);

  return (
    <SearchFormContainer
      onBlur={(e) =>
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
        onSubmit={(e) => {
          e.preventDefault();
          setIsModal(false);
          navigate(`/search/${title}`);
        }}
      >
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            debounceSearch(e);
          }}
          onClick={() => !isModal && setIsModal(true)}
          onKeyDown={(e) => KeyDownSearch(e)}
          type="text"
          placeholder="검색어를 입력해 주세요"
        />

        <SearchButton />
      </SearchFormComponent>
      <SearchModal
        isError={isError}
        autoSearch={data}
        isModal={isModal}
        errText={errText}
        selectIdx={selectIdx}
        setIsModal={setIsModal}
      />
    </SearchFormContainer>
  );
};

export default SearchForm;
