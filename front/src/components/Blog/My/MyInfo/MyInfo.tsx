import useAuthAPI from "hooks/API/useAuthAPI";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MyInfoContainer } from "../MyStyle";

const MyInfo = () => {
  const { GetUser, PathMyProfile } = useAuthAPI();

  const [file, setFile] = useState<File>();

  const queryClient = useQueryClient();

  const { data: { data } = {} } = useQuery("myInfo", GetUser, {
    select: data => data.data,
  });

  const { mutate } = useMutation(
    (profile: FormData) => PathMyProfile(profile),
    {
      onSuccess: () => queryClient.invalidateQueries("myInfo"),
    }
  );

  return (
    <MyInfoContainer>
      <img src={data?.profile} alt="" />
      <div>
        <h2>{data?.name}</h2>
      </div>
      <div>
        <input
          type="file"
          onChange={e => {
            if (e.target.files && e.target.files.length) {
              let fileData = e.target.files[0];
              setFile(fileData);
            }
          }}
        />
        <button
          onClick={() => {
            const form = new FormData();
            file && form.append("profile", file);
            mutate(form);
          }}
        >
          바꾸기
        </button>
      </div>
    </MyInfoContainer>
  );
};

export default MyInfo;
