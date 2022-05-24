import { HearderSearchErrContainer } from "./HearderSearchErrStyle";

interface IHearderSearchErr {
  searchData: string;
}

const HearderSearchErr = ({ searchData }: IHearderSearchErr) => {
  return (
    <HearderSearchErrContainer>
      "<span>{searchData}</span>" 에 대한 검색결과가 없습니다.
    </HearderSearchErrContainer>
  );
};

export default HearderSearchErr;
