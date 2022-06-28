import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import useModal from "hooks/modal";
import { useNavigate } from "react-router-dom";

interface IErrorModal {
  // title: string;
  content: string;
  // status: number;
  // buttonText: string;
  // onClick: () => any;
}

const Error = ({ content }: IErrorModal) => {
  const navigate = useNavigate();

  return (
    <ModalForm>
      <>
        <h2>⚠️ Error ⚠️</h2>
        <span>{content}</span>
        <DefaultButton onClick={() => navigate("/")} isAbled={true} size={"L"}>
          <>새로고침</>
        </DefaultButton>
      </>
    </ModalForm>
  );
};

export default Error;
