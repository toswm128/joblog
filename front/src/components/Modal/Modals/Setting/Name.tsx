import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import useModal from "hooks/modal";
import { useState } from "react";

const Name = ({ mutate }: { mutate: any }) => {
  const [name, setName] = useState("");
  const { closeModal } = useModal();

  const onClick = () => {
    console.log(name);
    mutate(name);
    closeModal();
  };

  return (
    <ModalForm>
      <>
        <h2>이름 변경</h2>
        <input
          type="text"
          placeholder="이름을 입력해 주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DefaultButton onClick={onClick} isAbled={true} size={"L"}>
          <>변경</>
        </DefaultButton>
      </>
    </ModalForm>
  );
};

export default Name;
