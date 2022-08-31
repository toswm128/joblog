import axios from "axios";
import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import useModal from "hooks/modal";

const Put = ({ putBoard }: { putBoard: any }) => {
  const { closeModal } = useModal();

  return (
    <ModalForm>
      <>
        <span>정말 수정 하겠습니까?</span>
        <div>
          <DefaultButton onClick={() => putBoard()} isAbled={true} size={"L"}>
            <>수정</>
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

export default Put;
