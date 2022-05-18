import React from "react";
import { HeaderContaier, HeaderLeft, HeaderRight } from "./headerStyle";
import logo from "assets/png/jobl_logo.png";
import { Link } from "react-router-dom";
import AuthAPI from "assets/API/AuthAPI";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const Header = () => {
  const { GetUser2Id } = new AuthAPI();

  const { isSuccess, data: { data } = {} } = useQuery("myInfo", GetUser2Id, {
    retry: false,
  });
  const queryClient = useQueryClient();

  return (
    <HeaderContaier>
      <HeaderLeft>
        <div className="header-logo">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header-nav">
          <Link to={"/"}>내 블로그</Link>
        </div>
        <div className="header-nav">
          <Link to={"/write"}>글쓰기</Link>
        </div>
      </HeaderLeft>
      <HeaderRight>
        <div className="header-search">
          <input type="text" placeholder="검색어를 입력해 주세요" />
          <button>검색</button>
        </div>
        {isSuccess ? (
          <>
            <div className="header-authBtn">{data?.data.name}</div>
            <div
              className="header-authBtn"
              onClick={() => {
                localStorage.removeItem("AccessToken");
                axios.defaults.headers.common["Authorization"] = "";
                queryClient.invalidateQueries("myInfo");
              }}
            >
              로그아웃
            </div>
          </>
        ) : (
          <>
            <Link to={"/login"} className="header-authBtn">
              로그인
            </Link>
            <Link to={"/join"} className="header-authBtn">
              회원가입
            </Link>
          </>
        )}
      </HeaderRight>
    </HeaderContaier>
  );
};

export default Header;
