import { ModalCard, ModalContainer } from "./ModalStyle";

const Modal = () => {
  return (
    <ModalContainer>
      <ModalCard>
        <h2>⚠️ Warning! ⚠️</h2>
        <span>좆됐습니다!!</span>
        <button>
          <div>새로고침</div>
        </button>
      </ModalCard>
    </ModalContainer>
  );
};
export default Modal;
