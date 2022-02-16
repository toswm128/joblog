import React from "react";
import { LoginPageContainer, LoginPageContent } from "./LoginPageStyle";
import logo from "assets/png/jobl_logo.png";
import { AuthInput } from "components/common/InputStyle";
import { AuthButton } from "components/common/ButtonStyle";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <LoginPageContent>
        <img src={logo} alt="" />
        <AuthInput placeholder="아이디" />
        <AuthInput placeholder="비밀번호" type="password" />
        <div>
          <AuthButton>로그인</AuthButton>
          <AuthButton>회원가입 하러 가기</AuthButton>
        </div>
      </LoginPageContent>
    </LoginPageContainer>
  );
};

export default LoginPage;
