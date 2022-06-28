import styled from "@emotion/styled";
import useAuthAPI from "hooks/API/useAuthAPI";
import useModal from "hooks/modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ModalShowButton } from "../SettingStyle";

const ProfileSetting = () => {
  const { PatchMyProfile } = useAuthAPI();

  const [file, setFile] = useState<File>();
  const [src, setSrc] = useState("");
  const { openModal } = useModal();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (profile: FormData) => PatchMyProfile(profile),
    {
      onSuccess: () => queryClient.invalidateQueries("myInfo"),
    }
  );

  return (
    <div>
      <ModalShowButton
        onClick={() =>
          openModal("setting/profile", {
            type: "jsx",
            titleText: "프로필 사진 변경",
            content: (
              <ModalContent>
                <label htmlFor="profilePatch">
                  {src ? (
                    <img src={src} alt="" />
                  ) : (
                    <img
                      src="http://localhost:5000/image?file=user.png"
                      alt=""
                    />
                  )}
                  클릭하여 변경
                </label>

                <input
                  id="profilePatch"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length) {
                      let fileData = e.target.files[0];
                      setFile(fileData);
                      setSrc(URL.createObjectURL(fileData));
                    }
                  }}
                />
              </ModalContent>
            ),
            status: 0,
            button: [
              {
                title: src ? "변경" : "기본 프로필로 변경",
                fuc: () => {
                  const form = new FormData();
                  file
                    ? form.append("profile", file)
                    : form.append(
                        "profile",
                        "http://localhost:5000/image?file=user.png"
                      );
                  mutate(form);
                },
              },
            ],
          })
        }
      >
        프로필 사진 변경
      </ModalShowButton>
    </div>
  );
};

const ModalContent = styled.div`
  & > label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 15px;
  }

  & > input {
    width: 0;
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export default ProfileSetting;
