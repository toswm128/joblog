import Loader from "components/common/Loader";
import useAuthAPI from "hooks/API/useAuthAPI";
import { useIsFetching, useQuery } from "react-query";
import { MyInfoContainer } from "../MyStyle";
import NameSetting from "./Setting/NameSetting";
import ProfileSetting from "./Setting/ProfileSetting";

const MyInfoLoader = () => {
  return (
    <>
      <img style={{ backgroundColor: "#c4c4c4" }} />
      <div>
        <h2></h2>
      </div>
      <ProfileSetting />
    </>
  );
};

const MyInfo = () => {
  const { GetUser } = useAuthAPI();

  const isFetchingGetBoard = useIsFetching("getBoard");

  const { data: { data } = {}, isFetching } = useQuery("myInfo", GetUser, {
    onError: err => console.log("err"),
  });

  return (
    <>
      <MyInfoContainer>
        {isFetchingGetBoard || isFetching ? (
          <MyInfoLoader />
        ) : (
          <>
            <img src={data?.profile} alt="" />
            <div>
              <h2>{data?.name}</h2>
            </div>
            <NameSetting />
            <ProfileSetting />
          </>
        )}
      </MyInfoContainer>
    </>
  );
};

export default MyInfo;
