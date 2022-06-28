import DefaultButton from "../common/Buttons/DefaultButton";
import { ModalCard, ModalContainer } from "./ModalStyle";
import useModal from "hooks/modal";
// import loadable from "@loadable/component";
import ModalPortal from "./ModalPortal";
import ErrorModal from "./Modals/Error/Error";

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
        return <ErrorModal {...props} />;
    }
  };

  return <ModalPortal>{isOpen ? ModalSelecter() : <></>}</ModalPortal>;
};
export default Modal;
