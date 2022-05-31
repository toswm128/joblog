import useAuthAPI from "hooks/API/useAuthAPI";
import { useQuery } from "react-query";
import { MyInfoContainer } from "../MyStyle";
import ProfileSetting from "./Setting";

const MyInfo = () => {
  const { GetUser } = useAuthAPI();

  const { data: { data } = {} } = useQuery("myInfo", GetUser, {
    select: data => data.data,
  });

  return (
    <MyInfoContainer>
      <img src={data?.profile} alt="" />
      <div>
        <h2>{data?.name}</h2>
      </div>
      <ProfileSetting />
    </MyInfoContainer>
  );
};

export default MyInfo;
