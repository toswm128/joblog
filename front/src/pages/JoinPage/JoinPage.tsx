import React, { useState } from "react";
import logo from "assets/png/jobl_logo.png";
import { AuthInput } from "components/common/InputStyle";
import { AuthButton } from "components/common/ButtonStyle";
import {
  LoginPageContainer as JoinPageContainer,
  LoginPageContent as JoinPageContent,
} from "pages/LoginPage/LoginPageStyle";
import AuthAPI from "assets/API/AuthAPI";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const { Join } = new AuthAPI();
  const navigate = useNavigate();
  return (
    <JoinPageContainer>
      <JoinPageContent>
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
        />
        <AuthInput
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름"
        />
        <div>
          <AuthButton
            onClick={async () => {
              const result = await Join(id, pwd, name);
              if (result === 200) {
                navigate("/login");
              }
            }}
          >
            회원가입
          </AuthButton>
          <AuthButton onClick={() => navigate("/login")}>
            로그인 하러 가기
          </AuthButton>
        </div>
      </JoinPageContent>
    </JoinPageContainer>
  );
};

export default JoinPage;
