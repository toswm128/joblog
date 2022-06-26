import DefaultButton from "../common/Buttons/DefaultButton";
import { ModalCard, ModalContainer } from "./ModalStyle";
import reactDom from "react-dom";
import useModal from "hooks/modal";

const ModalPortal = ({ children }: { children: JSX.Element }) => {
  const el = document.getElementById("modal");
  return el && reactDom.createPortal(children, el);
};

// interface IModal {
//   isModal?: boolean;
//   title: string;
//   buttonText: string;
//   btnClick: () => void;
//   backgroundClick?: () => void;
//   children: JSX.Element;
// }

const Modal = () => {
  const { ModalState, closeModal } = useModal();
  const { isOpen, type, Modals } = ModalState;
  const modal = Modals.get(type);
  console.log(isOpen, type, modal);

  return (
    <ModalPortal>
      <>
        {isOpen ? (
          <ModalContainer
            onClick={(e) => e.currentTarget === e.target && closeModal()}
          >
            <ModalCard>
              <h2>{modal?.titleText}</h2>
              <span>{modal?.content}</span>
              {modal?.button?.map((button, key) => (
                <DefaultButton
                  key={key}
                  onClick={button.fuc}
                  isAbled={true}
                  size={"L"}
                >
                  <>{button.title}</>
                </DefaultButton>
              ))}
            </ModalCard>
          </ModalContainer>
        ) : (
          <></>
        )}
      </>
    </ModalPortal>
  );
};
export default Modal;
