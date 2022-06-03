import Loader from "components/common/Loader";
import useAuthAPI from "hooks/API/useAuthAPI";
import { useIsFetching, useQuery } from "react-query";
import { MyInfoContainer } from "../MyStyle";
import ProfileSetting from "./Setting/ProfileSetting";

const MyInfo = () => {
  const { GetUser } = useAuthAPI();

  const isFetchingGetBoard = useIsFetching("getBoard");

  const { data: { data } = {} } = useQuery("myInfo", GetUser, {
    onError: err => console.log("err"),
  });

  return (
    <>
      {!isFetchingGetBoard && (
        <MyInfoContainer>
          <img src={data?.profile} alt="" />
          <div>
            <h2>{data?.name}</h2>
          </div>
          <ProfileSetting />
        </MyInfoContainer>
      )}
    </>
  );
};

export default MyInfo;
