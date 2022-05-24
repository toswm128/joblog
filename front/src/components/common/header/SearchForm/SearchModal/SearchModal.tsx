import HearderSearchErr from "components/common/Error/HearderSearchErr";
import { Link } from "react-router-dom";
import { blog } from "Store/BlogStore/type";
import { SearchDataList } from "../SearchFormStyled";

interface ISearchModal {
  isError: boolean;
  autoSearch: blog[] | undefined;
  isModal: boolean;
  errText: string;
}

const SearchModal = ({
  isError,
  autoSearch,
  isModal,
  errText,
}: ISearchModal) => {
  return (
    <>
      {isModal && (
        <SearchDataList>
          {isError && <HearderSearchErr searchData={errText} />}
          {autoSearch?.map((current: any) => (
            <Link to={`/board/${current.idx}`} key={current.idx}>
              {current.title}
            </Link>
          ))}
        </SearchDataList>
      )}
    </>
  );
};

export default SearchModal;
