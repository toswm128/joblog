import useModal from "hooks/modal";
// import loadable from "@loadable/component";
import ModalPortal from "./ModalPortal";
import Error from "./Modals/Error/Error";
import Logout from "./Modals/Setting/Logout";
import Name from "./Modals/Setting/Name";
import Profile from "./Modals/Setting/Profile";

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
