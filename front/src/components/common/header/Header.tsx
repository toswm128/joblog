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
      </HeaderLeft>
      <SearchForm />
      <HeaderRight>
        <HeaderButtons />
      </HeaderRight>
    </HeaderContaier>
  );
};

export default Header;
