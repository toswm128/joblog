import Modal from "components/Modal";
import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ModalShowButton } from "../SettingStyle";

const NameSetting = () => {
  const { PatchMyName } = useAuthAPI();
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  const { mutate } = useMutation((name: string) => PatchMyName(name), {
    onSuccess: (data, variables) => {
      queryClient.setQueryData("myInfo", (old: any) => {
        old.data.data.name = variables;
        return old;
      });
    },
  });

  return (
    <div>
      <ModalShowButton
        onClick={
          () => openModal("setting/name", { mutate })
          // openModal("custom", {
          //   type: "jsx",
          //   titleText: "이름 변경",
          //   content: (
          //     <input
          //       type="text"
          //       placeholder="이름을 입력해 주세요"
          //       onChange={(e) => setName(e.target.value)}
          //     />
          //   ),
          //   status: 0,
          //   button: [
          //     {
          //       title: "변경",
          //       fuc: () => mutate(),
          //     },
          //   ],
          // })
        }
      >
        이름 변경
      </ModalShowButton>
    </div>
  );
};

export default NameSetting;
