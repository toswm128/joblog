import axios from "axios";
import Modal from "components/common/Modal";
import useModal from "hooks/modal";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ModalShowButton } from "../SettingStyle";

const LogoutSetting = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isModal, showModal, closeModal, status } = useModal(false);

  return (
    <div>
      <ModalShowButton onClick={() => showModal()}>로그아웃</ModalShowButton>
      <Modal
        isModal={isModal}
        title={""}
        buttonText={"로그아웃"}
        backgroundClick={closeModal}
        btnClick={() => {
          localStorage.removeItem("AccessToken");
          axios.defaults.headers.common["Authorization"] = "";
          queryClient.invalidateQueries("myInfo");
          navigate("/");
        }}
      >
        <>정말 로그아웃 하시겠습니까?</>
      </Modal>
    </div>
  );
};

export default LogoutSetting;
