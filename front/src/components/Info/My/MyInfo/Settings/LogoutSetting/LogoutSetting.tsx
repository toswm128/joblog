import useModal from "hooks/modal";
import { ModalShowButton } from "../SettingStyle";

const LogoutSetting = () => {
  const { openModal } = useModal();

  return (
    <div>
      <ModalShowButton onClick={() => openModal("setting/logout", {})}>
        로그아웃
      </ModalShowButton>
    </div>
  );
};

export default LogoutSetting;
