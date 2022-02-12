import React from "react";
import { HeaderContaier, HeaderLeft, HeaderRight } from "./headerStyle";
import logo from "../../assets/png/jobl_logo.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <HeaderContaier>
      <HeaderLeft>
        <div className="header-logo">
          <img src={logo} alt="" />
        </div>
        <div className="header-nav">
          <Link to={"/"}>내 블로그</Link>
        </div>
        <div className="header-nav">
          <Link to={"/"}>글쓰기</Link>
        </div>
      </HeaderLeft>
      <HeaderRight>
        <div className="header-search">
          <input type="text" placeholder="검색어를 입력해 주세요" />
          <button>검색</button>
        </div>
        <Link to={"/"} className="header-authBtn">
          로그인
        </Link>
        <Link to={"/"} className="header-authBtn">
          회원가입
        </Link>
      </HeaderRight>
    </HeaderContaier>
  );
};

export default LoginPage;
