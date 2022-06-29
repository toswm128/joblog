import axios from "axios";
import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import useModal from "hooks/modal";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const onClick = () => {
    localStorage.removeItem("AccessToken");
    axios.defaults.headers.common["Authorization"] = "";
    queryClient.invalidateQueries("myInfo");
    navigate("/");
    closeModal();
  };

  return (
    <ModalForm>
      <>
        <span>정말 로그아웃 하시겠습니까?</span>
        <DefaultButton onClick={onClick} isAbled={true} size={"L"}>
          <>로그아웃</>
        </DefaultButton>
      </>
    </ModalForm>
  );
};

export default Logout;
