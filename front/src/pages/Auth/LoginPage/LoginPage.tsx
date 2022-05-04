import React, { useState } from "react";
import { LoginPageContainer, LoginPageContent } from "./LoginPageStyle";
import logo from "assets/png/jobl_logo.png";
import { AuthInput } from "components/common/InputStyle";
import { AuthButton } from "components/common/ButtonStyle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthAPI from "assets/API/AuthAPI";
import useUser from "hooks/user";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const { Login } = new AuthAPI();
  const { setUser } = useUser();

  return (
    <LoginPageContainer>
      <LoginPageContent>
        <img src={logo} alt="" />
        <AuthInput
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="아이디"
        />
        <AuthInput
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          placeholder="비밀번호"
          type="password"
        />
        <div>
          <AuthButton
            onClick={async () => {
              const result = await Login(id, pwd);
              if (result.status == 200) {
                const { idx, name } = result.data.data;
                setUser({ userId: idx, name });
                navigate("/");
              }
            }}
          >
            로그인
          </AuthButton>
          <AuthButton onClick={() => navigate("/join")}>
            회원가입 하러 가기
          </AuthButton>
        </div>
      </LoginPageContent>
    </LoginPageContainer>
  );
};

export default LoginPage;
