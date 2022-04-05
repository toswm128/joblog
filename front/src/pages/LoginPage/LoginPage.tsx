import React, { useState } from "react";
import { LoginPageContainer, LoginPageContent } from "./LoginPageStyle";
import logo from "assets/png/jobl_logo.png";
import { AuthInput } from "components/common/InputStyle";
import { AuthButton } from "components/common/ButtonStyle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

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
              const result = await axios.post("http://127.0.0.1:5000/login", {
                id,
                password: pwd,
              });
              if (result.status == 200) {
                navigate("/");
                localStorage.setItem("AccessToken", result.data.data);
              }
            }}
          >
            로그인
          </AuthButton>
          <AuthButton>회원가입 하러 가기</AuthButton>
        </div>
      </LoginPageContent>
    </LoginPageContainer>
  );
};

export default LoginPage;
