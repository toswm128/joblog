import useAuthAPI from "hooks/API/useAuthAPI";
import { idReg, pwdReg } from "assets/regExp/authRegExp";
import axios, { AxiosError } from "axios";
import Modal from "components/common/Modal";
import { AuthButton } from "components/common/styleObject/ButtonStyle";
import useModal from "hooks/modal";
import { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm";
import AuthInput from "../AuthInput";

const Login = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();
  const { Login } = useAuthAPI();
  const { isModal, showModal, closeModal, status } = useModal(false);

  const quetClient = useQueryClient();

  const { mutate } = useMutation(() => Login(id, pwd), {
    onSuccess: (data) => {
      const { token } = data?.data.data;
      localStorage.setItem("AccessToken", token);
      axios.defaults.headers.common["Authorization"] = token;
      quetClient.refetchQueries("myInfo");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      showModal(error.response?.status);
    },
  });

  return (
    <>
      <AuthForm submit={() => (id && pwd ? mutate() : showModal(1))}>
        <>
          <AuthInput
            setValue={setId}
            placeholder="아이디"
            type="text"
            reg={idReg}
            errMsg="6~20자리의 대소문자 및 숫자를 입력해 주세요"
          />
          <AuthInput
            setValue={setPwd}
            placeholder="비밀번호"
            type="password"
            reg={pwdReg}
            errMsg="8~16자리의 대소문자 및 숫자를 입력해 주세요"
          />
          <div>
            <AuthButton>로그인</AuthButton>
            <AuthButton onClick={() => navigate("/join")}>
              회원가입 하러 가기
            </AuthButton>
          </div>
        </>
      </AuthForm>
      <Modal
        isModal={isModal}
        title={"⚠️ Error ⚠️"}
        buttonText={"닫기"}
        btnClick={closeModal}
        backgroundClick={closeModal}
      >
        <>
          {status === 400 && "비밀번호가 틀렸습니다"}
          {status === 404 && "존재하지 않는 아이디 입니다"}
          {status === 1 && "조건에 맞지 않는 항목이 있습니다"}
          {status >= 500 && "서버 에러"}
          {status === 0 && "인터넷 상태가 불안정 합니다."}
        </>
      </Modal>
    </>
  );
};

export default Login;
