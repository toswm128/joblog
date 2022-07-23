import useModal from "hooks/modal";
import ModalPortal from "./ModalPortal";

import Error from "./Modals/Error/Error";
import Profile from "./Modals/Setting/Profile";
import Logout from "./Modals/Setting/Logout";
import Name from "./Modals/Setting/Name";

// export const Modals = {
// };

const Modal = () => {
  const { ModalState } = useModal();
  const { isOpen, type, props } = ModalState;

  const ModalSelecter = () => {
    switch (type) {
      case "error":
        return <Error {...props} />;
      case "setting/name":
        return <Name {...props} />;
      case "setting/profile":
        return <Profile {...props} />;
      case "setting/logout":
        return <Logout {...props} />;
    }
  };

  return <ModalPortal>{isOpen ? ModalSelecter() : <></>}</ModalPortal>;
};
export default Modal;
