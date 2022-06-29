import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useMutation, useQueryClient } from "react-query";
import { ModalShowButton } from "../SettingStyle";

const ProfileSetting = () => {
  const { PatchMyProfile } = useAuthAPI();
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  const { mutate } = useMutation(
    (profile: FormData) => PatchMyProfile(profile),
    {
      onSuccess: () => queryClient.invalidateQueries("myInfo"),
    }
  );

  return (
    <div>
      <ModalShowButton onClick={() => openModal("setting/profile", { mutate })}>
        프로필 사진 변경
      </ModalShowButton>
    </div>
  );
};

export default ProfileSetting;
