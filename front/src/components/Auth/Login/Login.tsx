import AuthAPI from "assets/API/AuthAPI";
import axios, { AxiosError } from "axios";
import Modal from "components/common/Modal";
import { AuthButton } from "components/common/styleObject/ButtonStyle";
import { AuthInput } from "components/common/styleObject/InputStyle";
import useModal from "hooks/modal";
import useUser from "hooks/user";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm";

const Login = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const { Login } = new AuthAPI();
  const { setUser } = useUser();
  const { isModal, showModal, closeModal, status } = useModal(false);

  const quetClient = useQueryClient();

  const { mutate } = useMutation(() => Login(id, pwd), {
    onSuccess: data => {
      const { idx, name, profile, token } = data?.data.data;
      setUser({ userId: idx, name, profile });
      localStorage.setItem("AccessToken", token);
      axios.defaults.headers.common["Authorization"] = token;
      quetClient.invalidateQueries("myInfo");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      showModal(error.response?.status);
    },
  });

  return (
    <>
      <AuthForm submit={mutate}>
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
      <Modal
        isModal={isModal}
        title={"⚠️ Error ⚠️"}
        context={status === 400 ? "로그인 실패" : "인터넷 오류"}
        buttonText={"닫기"}
        btnClick={closeModal}
        backgroundClick={closeModal}
      />
    </>
  );
};

export default Login;
