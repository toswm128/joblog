import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import { useState } from "react";

const Name = ({ mutate }: { mutate: any }) => {
  const [name, setName] = useState("");
  console.log(name);

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
        <DefaultButton onClick={() => mutate(name)} isAbled={true} size={"L"}>
          <>변경</>
        </DefaultButton>
      </>
    </ModalForm>
  );
};

export default Name;
