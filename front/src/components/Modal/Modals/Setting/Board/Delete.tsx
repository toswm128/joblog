import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import useModal from "hooks/modal";

const Delete = ({ removeBoard }: { removeBoard: any }) => {
  const { closeModal } = useModal();

  return (
    <ModalForm>
      <>
        <span>정말 삭제 하겠습니까?</span>
        <div>
          <DefaultButton
            onClick={() => removeBoard()}
            isAbled={true}
            size={"L"}
          >
            <>삭제</>
          </DefaultButton>
          <DefaultButton
            onClick={() => closeModal()}
            isAbled={false}
            size={"L"}
          >
            <>취소</>
          </DefaultButton>
        </div>
      </>
    </ModalForm>
  );
};

export default Delete;
