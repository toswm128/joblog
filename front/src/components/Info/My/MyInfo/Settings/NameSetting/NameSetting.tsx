import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useMutation, useQueryClient } from "react-query";
import { ModalShowButton } from "../SettingStyle";

const NameSetting = () => {
  const { PatchMyName } = useAuthAPI();
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  const { mutate } = useMutation((name: string) => PatchMyName(name), {
    onSuccess: (_, variables) => {
      queryClient.setQueryData("myInfo", (old: any) => {
        old.data.data.name = variables;
        return old;
      });
    },
  });

  return (
    <div>
      <ModalShowButton onClick={() => openModal("setting/name", { mutate })}>
        이름 변경
      </ModalShowButton>
    </div>
  );
};

export default NameSetting;
