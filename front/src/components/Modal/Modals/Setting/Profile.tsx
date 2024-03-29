import styled from "@emotion/styled";
import DefaultButton from "components/common/Buttons/DefaultButton";
import ModalForm from "components/Modal/ModalForm";
import useModal from "hooks/modal";
import { useState } from "react";

interface IProfileModal {
  mutate: (file: any) => any;
}

const useProfileModal = ({ mutate }: IProfileModal) => {
  const [file, setFile] = useState<File>();
  const [src, setSrc] = useState("");
  const { closeModal } = useModal();

  const onClick = () => {
    const form = new FormData();
    file
      ? form.append("profile", file)
      : form.append("profile", "http://joblog.kro.kr:5000/image?file=user.png");
    mutate(form);
    closeModal();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      let fileData = e.target.files[0];
      setFile(fileData);
      setSrc(URL.createObjectURL(fileData));
    }
  };

  return { src, onClick, onChange };
};

const Profile = ({ mutate }: IProfileModal) => {
  const { src, onClick, onChange } = useProfileModal({ mutate });
  return (
    <ModalForm>
      <>
        <ModalContent>
          <h2>프로필 사진 변경</h2>
          <label htmlFor="profilePatch">
            {src ? (
              <img src={src} alt="" />
            ) : (
              <img src="http://joblog.kro.kr:5000/image?file=user.png" alt="" />
            )}
            클릭하여 변경
          </label>

          <input id="profilePatch" type="file" onChange={onChange} />
        </ModalContent>
        <DefaultButton onClick={onClick} isAbled={true} size={"L"}>
          <>{src ? "변경" : "기본 프로필로 변경"}</>
        </DefaultButton>
      </>
    </ModalForm>
  );
};

const ModalContent = styled.main`
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

export default Profile;
