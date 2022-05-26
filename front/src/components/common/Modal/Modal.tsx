import { ModalCard, ModalContainer } from "./ModalStyle";

interface Modal {
  title: string;
  context: string;
  buttonText: string;
  btnClick: () => void;
  backgroundClick?: () => void;
}

const Modal = ({
  title,
  context,
  buttonText,
  btnClick,
  backgroundClick,
}: Modal) => {
  return (
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
  );
};
export default Modal;
