import styled from "@emotion/styled";
import { browserColor, whiteActive, whiteHover } from "style/color";
import search from "assets/png/search.png";

const SearchButton = () => {
  return (
    <SearchButtonStyle>
      <img src={search} alt="" />
    </SearchButtonStyle>
  );
};

const SearchButtonStyle = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${browserColor};
  border: 0;
  border-radius: 50%;
  transition: 0.1s all;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${whiteHover};
  }
  &:active {
    background-color: ${whiteActive};
  }

  & > img {
    width: 25px;
  }
`;

export default SearchButton;
