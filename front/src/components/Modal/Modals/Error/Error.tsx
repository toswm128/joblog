import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import useModal from "hooks/modal";
import { useNavigate } from "react-router-dom";

interface IErrorModal {
  status: number;
}

const Error = ({ status }: IErrorModal) => {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  return (
    <ModalForm>
      <>
        <h2>⚠️ Error ⚠️</h2>
        <span>
          {!status && "인터넷 연결이 불안정 합니다"}
          {status === 500 && "예기치 않은 오류가 발생 하였습니다"}
          {status === 400 && "옳바르지 않은 요청입니다 다시 확인해 보세요"}
        </span>
        <DefaultButton
          onClick={() => (status === 400 ? closeModal() : navigate("/"))}
          isAbled={true}
          size={"L"}
        >
          <>{status === 400 ? "닫기" : "새로고침"}</>
        </DefaultButton>
      </>
    </ModalForm>
  );
};

export default Error;
