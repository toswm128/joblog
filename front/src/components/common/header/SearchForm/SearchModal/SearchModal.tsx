import HearderSearchErr from "components/common/Error/HearderSearchErr";
import { Link } from "react-router-dom";
import { blog } from "types/BlogTypes/type";
import { SearchDataList } from "../SearchFormStyled";

interface ISearchModal {
  isError: boolean;
  autoSearch: blog[] | undefined;
  isModal: boolean;
  errText: string;
  selectIdx: number;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = ({
  isError,
  autoSearch,
  isModal,
  errText,
  selectIdx,
  setIsModal,
}: ISearchModal) => {
  return (
    <>
      {isModal && (
        <SearchDataList>
          {isError && <HearderSearchErr searchData={errText} />}
          {autoSearch?.map((current: blog, key: number) => (
            <Link
              to={`/board/${current.idx}`}
              key={current.idx}
              onClick={() => setIsModal(false)}
              style={selectIdx === key ? { backgroundColor: "#c4c4c4" } : {}}
            >
              {current.title}
            </Link>
          ))}
        </SearchDataList>
      )}
    </>
  );
};

export default SearchModal;
