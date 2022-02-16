import React from "react";
import logo from "assets/png/jobl_logo.png";
import { AuthInput } from "components/common/InputStyle";
import { AuthButton } from "components/common/ButtonStyle";
import {
  LoginPageContainer as JoinPageContainer,
  LoginPageContent as JoinPageContent,
} from "pages/LoginPage/LoginPageStyle";

const JoinPage = () => {
  return (
    <JoinPageContainer>
      <JoinPageContent>
        <img src={logo} alt="" />
        <AuthInput placeholder="아이디" />
        <AuthInput placeholder="비밀번호" />
        <AuthInput placeholder="이름" />
        <div>
          <AuthButton>회원가입</AuthButton>
          <AuthButton>로그인 하러 가기</AuthButton>
        </div>
      </JoinPageContent>
    </JoinPageContainer>
  );
};

export default JoinPage;
