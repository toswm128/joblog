import useAuthAPI from "hooks/API/useAuthAPI";
import { idReg, nameReg, pwdReg } from "assets/regExp/authRegExp";
import Modal from "components/common/Modal";
import { AuthButton } from "components/common/styleObject/ButtonStyle";
import useModal from "hooks/modal";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm";
import AuthInput from "../AuthInput";

const Join = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");

  const { isModal, showModal, closeModal, status } = useModal(false);

  const { Join } = useAuthAPI();
  const navigate = useNavigate();

  const { mutate } = useMutation(() => Join(id, pwd, name), {
    onSuccess: () => navigate("/login"),
    onError: showModal,
  });

  return (
    <>
      <AuthForm submit={() => (id && pwd && name ? mutate() : showModal(1))}>
        <>
          <AuthInput
            updateValue={value => (value || id) && setId(value)}
            type="text"
            placeholder="아이디"
            reg={idReg}
            errMsg="6~20자리의 대소문자 및 숫자를 입력해 주세요."
            successMsg="사용 가능한 아이디 입니다."
          />
          <AuthInput
            type="password"
            updateValue={value => (value || pwd) && setPwd(value)}
            placeholder="비밀번호"
            reg={pwdReg}
            errMsg="8~16자리의 대소문자 및 숫자를 입력해 주세요"
            successMsg="사용 가능한 비밀번호 입니다."
          />
          <AuthInput
            type="text"
            updateValue={value => (value || name) && setName(value)}
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
      <Modal
        isModal={isModal}
        title={"⚠️ Error ⚠️"}
        buttonText={"닫기"}
        btnClick={closeModal}
      >
        <>
          {status === 1 && "조건에 맞지 않는 항목이 있습니다"}
          {status === 500 && "서버 에러"}
        </>
      </Modal>
    </>
  );
};

export default Join;
