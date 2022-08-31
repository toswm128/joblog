import useModal from "hooks/modal";
import ModalPortal from "./ModalPortal";

import Error from "./Modals/Error/Error";
import Profile from "./Modals/Setting/Profile";
import Logout from "./Modals/Setting/Logout";
import Name from "./Modals/Setting/Name";
import Delete from "./Modals/Setting/Board/Delete";
import Put from "./Modals/Setting/Board/Put";

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
      case "board/setting/delete":
        return <Delete {...props} />;
      case "board/setting/put":
        return <Put {...props} />;
    }
  };

  return <ModalPortal>{isOpen ? ModalSelecter() : <></>}</ModalPortal>;
};
export default Modal;
