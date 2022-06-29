import useModal from "hooks/modal";
// import loadable from "@loadable/component";
import ModalPortal from "./ModalPortal";
import Error from "./Modals/Error/Error";
import Name from "./Modals/Setting/Name";

// export const Modals = {
// };

const Modal = () => {
  const { ModalState } = useModal();
  const { isOpen, type, props } = ModalState;

  console.log(isOpen);
  console.log(type);

  const ModalSelecter = () => {
    switch (type) {
      case "error":
        return <Error {...props} />;
      case "setting/name":
        return <Name {...props} />;
    }
  };

  return <ModalPortal>{isOpen ? ModalSelecter() : <></>}</ModalPortal>;
};
export default Modal;
