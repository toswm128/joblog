import { ModalCard, ModalContainer } from "./ModalStyle";

interface Modal {
  isModal: boolean;
  title: string;
  buttonText: string;
  btnClick: () => void;
  backgroundClick?: () => void;
  children: JSX.Element;
}

const Modal = ({
  isModal,
  title,
  buttonText,
  btnClick,
  backgroundClick,
  children,
}: Modal) => {
  return (
    <>
      {isModal ? (
        <ModalContainer
          onClick={e =>
            e.currentTarget === e.target && backgroundClick && backgroundClick()
          }
        >
          <ModalCard>
            <h2>{title}</h2>
            <span>{children}</span>
            <button>
              <div onClick={btnClick}>{buttonText}</div>
            </button>
          </ModalCard>
        </ModalContainer>
      ) : (
        <></>
      )}
    </>
  );
};
export default Modal;
