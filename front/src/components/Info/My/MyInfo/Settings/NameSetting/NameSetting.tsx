import Modal from "components/Modal";
import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ModalShowButton } from "../SettingStyle";

const NameSetting = () => {
  const [name, setName] = useState("");
  const { PatchMyName } = useAuthAPI();
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  const { mutate } = useMutation(() => PatchMyName(name), {
    onSuccess: () => {
      queryClient.setQueryData("myInfo", (old: any) => {
        old.data.data.name = name;
        return old;
      });
    },
  });

  return (
    <div>
      <ModalShowButton
        onClick={() =>
          openModal("custom", {
            type: "jsx",
            titleText: "이름 변경",
            content: (
              <input
                type="text"
                placeholder="이름을 입력해 주세요"
                onChange={(e) => setName(e.target.value)}
              />
            ),
            status: 0,
            button: [
              {
                title: "변경",
                fuc: () => mutate(),
              },
            ],
          })
        }
      >
        이름 변경
      </ModalShowButton>
    </div>
  );
};

export default NameSetting;
