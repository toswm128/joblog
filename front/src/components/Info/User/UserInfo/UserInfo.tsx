import { basicColor } from "style/color";
import { UserType } from "types/UserTypes/type";
import { InfoComponent } from "../../InfoStyle";

export const UserInfoLoader = () => {
  return (
    <>
      <img style={{ backgroundColor: basicColor }} />
      <div>
        <h2></h2>
      </div>
    </>
  );
};

interface IUserInfo {
  isFetching: boolean;
  info: UserType;
}

const UserInfo = ({ isFetching, info }: IUserInfo) => {
  return (
    <InfoComponent>
      {isFetching ? (
        <UserInfoLoader />
      ) : (
        <>
          <img src={info?.profile} alt="" />
          <div>
            <h2>{info?.name}</h2>
          </div>
        </>
      )}
    </InfoComponent>
  );
};

export default UserInfo;
