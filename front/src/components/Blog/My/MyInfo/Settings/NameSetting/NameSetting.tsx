import Modal from "components/common/Modal";
import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ModalShowButton } from "../SettingStyle";

const NameSetting = () => {
  const { isModal, showModal, closeModal } = useModal(false);

  const [name, setName] = useState("");

  const { PatchMyName } = useAuthAPI();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => PatchMyName(name), {
    onSuccess: () => {
      queryClient.setQueryData("myInfo", (old: any) => {
        old.data.data.name = name;
        return old;
      });
      closeModal();
    },
  });

  return (
    <div>
      <ModalShowButton onClick={() => showModal()}>이름 변경</ModalShowButton>
      <Modal
        isModal={isModal}
        title={"이름 변경"}
        buttonText={"변경"}
        btnClick={() => mutate()}
        backgroundClick={() => closeModal()}
      >
        <>
          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </>
      </Modal>
    </div>
  );
};

export default NameSetting;
