import AuthAPI from "assets/API/AuthAPI";
import { AuthButton } from "components/common/styleObject/ButtonStyle";
import { AuthInput } from "components/common/styleObject/InputStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm";

const Join = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const { Join } = new AuthAPI();
  const navigate = useNavigate();

  const submitJoin = async () => {
    const result = await Join(id, pwd, name);
    if (result === 200) {
      navigate("/login");
    }
  };

  return (
    <AuthForm submit={submitJoin}>
      <>
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
          <AuthButton>회원가입</AuthButton>
          <AuthButton onClick={() => navigate("/login")}>
            로그인 하러 가기
          </AuthButton>
        </div>
      </>
    </AuthForm>
  );
};

export default Join;
