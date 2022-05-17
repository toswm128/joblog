import AuthAPI from "assets/API/AuthAPI";
import { AuthButton } from "components/common/styleObject/ButtonStyle";
import { AuthInput } from "components/common/styleObject/InputStyle";
import useUser from "hooks/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm";

const Login = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const { Login } = new AuthAPI();
  const { setUser } = useUser();

  const submitLogin = async () => {
    const result = await Login(id, pwd);
    if (result?.status === 200) {
      const { idx, name, profile } = result.data.data;
      setUser({ userId: idx, name, profile });
      navigate("/");
    }
  };

  return (
    <AuthForm submit={submitLogin}>
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
          type="password"
        />
        <div>
          <AuthButton>로그인</AuthButton>
          <AuthButton onClick={() => navigate("/join")}>
            회원가입 하러 가기
          </AuthButton>
        </div>
      </>
    </AuthForm>
  );
};

export default Login;
