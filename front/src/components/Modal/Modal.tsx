import useModal from "hooks/modal";
import { lazy } from "react";
import ModalPortal from "./ModalPortal";

const Error = lazy(() => import("./Modals/Error/Error"));
const Name = lazy(() => import("./Modals/Setting/Logout"));
const Profile = lazy(() => import("./Modals/Setting/Name"));
const Logout = lazy(() => import("./Modals/Setting/Profile"));

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
