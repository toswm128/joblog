import useModal from "hooks/modal";
import { ModalShowButton } from "../SettingStyle";

const LogoutSetting = () => {
  const { openModal } = useModal();

  return (
    <div>
      <ModalShowButton onClick={() => openModal("setting/logout", {})}>
        ๋ก๊ทธ์์
      </ModalShowButton>
    </div>
  );
};

export default LogoutSetting;
