import AuthAPI from "assets/API/AuthAPI";
import { idReg, nameReg, pwdReg } from "assets/regExp/authRegExp";
import { AuthButton } from "components/common/styleObject/ButtonStyle";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm";
import AuthInput from "../AuthInput";

const Join = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");

  const { Join } = new AuthAPI();
  const navigate = useNavigate();

  const { mutate } = useMutation(() => Join(id, pwd, name), {
    onSuccess: () => navigate("/login"),
  });

  return (
    <AuthForm submit={mutate}>
      <>
        <AuthInput
          type="text"
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="아이디"
          reg={idReg}
          errMsg="6~20자리의 대소문자 및 숫자를 입력해 주세요."
          successMsg="사용 가능한 아이디 입니다."
        />
        <AuthInput
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          placeholder="비밀번호"
          reg={pwdReg}
          errMsg="8~16자리의 대소문자 및 숫자를 입력해 주세요"
          successMsg="사용 가능한 비밀번호 입니다."
        />
        <AuthInput
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름"
          reg={nameReg}
          errMsg="8~16자리의 대소문자 및 숫자를 입력해 주세요"
          successMsg="사용 가능한 이름 입니다."
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
