import DefaultButton from "components/common/Buttons/DefaultButton";
import useModal from "hooks/modal";
import { ModalCard, ModalContainer } from "./ModalStyle";

const ModalForm = ({ children }: { children: JSX.Element }) => {
  const { closeModal } = useModal();
  return (
    <ModalContainer
      onClick={(e) => e.currentTarget === e.target && closeModal()}
    >
      <ModalCard>{children}</ModalCard>
    </ModalContainer>
  );
};

export default ModalForm;
