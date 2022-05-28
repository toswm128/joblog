import { HeaderContaier, HeaderLeft, HeaderRight } from "./headerStyle";
import logo from "assets/png/jobl_logo.png";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import HeaderButtons from "./HeaderButtons";

const Header = () => {
  return (
    <HeaderContaier>
      <HeaderLeft>
        <div className="header-logo">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header-nav">
          <Link to={"/my"}>내 블로그</Link>
        </div>
        <div className="header-nav">
          <Link to={"/write"}>글쓰기</Link>
        </div>
      </HeaderLeft>
      <HeaderRight>
        <SearchForm />
        <HeaderButtons />
      </HeaderRight>
    </HeaderContaier>
  );
};

export default Header;
