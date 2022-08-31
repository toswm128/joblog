import axios from "axios";
import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import useModal from "hooks/modal";

const Delete = () => {
  const { closeModal } = useModal();

  const deleteBoard = () => {
    console.log("삭제");
  };

  return (
    <ModalForm>
      <>
        <span>정말 삭제 하겠습니까?</span>
        <div>
          <DefaultButton
            onClick={() => deleteBoard()}
            isAbled={true}
            size={"L"}
          >
            <>삭제</>
          </DefaultButton>
          <DefaultButton onClick={() => closeModal()} isAbled={true} size={"L"}>
            <>취소</>
          </DefaultButton>
        </div>
      </>
    </ModalForm>
  );
};

export default Delete;
