import styled from "@emotion/styled";
import Modal from "components/common/Modal";
import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const ProfileSetting = () => {
  const { PathMyProfile } = useAuthAPI();

  const [file, setFile] = useState<File>();
  const { isModal, showModal, closeModal } = useModal(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (profile: FormData) => PathMyProfile(profile),
    {
      onSuccess: () => queryClient.invalidateQueries("myInfo"),
    }
  );

  return (
    <Container>
      <div onClick={() => showModal()}>프로필 사진 변경</div>
      <Modal
        isModal={isModal}
        title={"프로필 사진 변경"}
        buttonText={"바꾸기"}
        backgroundClick={closeModal}
        btnClick={() => {
          const form = new FormData();
          file && form.append("profile", file);
          mutate(form);
          closeModal();
        }}
      >
        <>
          <input
            type="file"
            onChange={e => {
              if (e.target.files && e.target.files.length) {
                let fileData = e.target.files[0];
                setFile(fileData);
              }
            }}
          />
        </>
      </Modal>
    </Container>
  );
};

const Container = styled.div``;

export default ProfileSetting;
