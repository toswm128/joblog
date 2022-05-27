import { ModalCard, ModalContainer } from "./ModalStyle";

interface Modal {
  isModal: boolean;
  title: string;
  context: string;
  buttonText: string;
  btnClick: () => void;
  backgroundClick?: () => void;
}

const Modal = ({
  isModal,
  title,
  context,
  buttonText,
  btnClick,
  backgroundClick,
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
            <span>{context}</span>
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
