import DefaultButton from "components/common/Buttons/DefaultButton";
import useWrite from "hooks/write/useWrite";
import { useNavigate } from "react-router-dom";

const CancelButton = () => {
  const { reset } = useWrite();
  const navigate = useNavigate();
  return (
    <DefaultButton
      onClick={() => {
        reset();
        navigate("/");
      }}
      isAbled={false}
      size={"M"}
    >
      <>취소</>
    </DefaultButton>
  );
};

export default CancelButton;
