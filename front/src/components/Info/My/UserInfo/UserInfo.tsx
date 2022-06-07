import { user, UserType } from "types/UserTypes/type";
import { InfoComponent } from "../../InfoStyle";
import Settings from "./Settings";

export const UserInfoLoader = () => {
  return (
    <InfoComponent>
      <img style={{ backgroundColor: "#c4c4c4" }} />
      <div>
        <h2></h2>
      </div>
      <Settings />
    </InfoComponent>
  );
};

interface IUserInfo {
  info: UserType;
}

const UserInfo = ({ info }: IUserInfo) => {
  return (
    <InfoComponent>
      <>
        <img src={info?.profile} alt="" />
        <div>
          <h2>{info?.name}</h2>
        </div>
        <Settings />
      </>
    </InfoComponent>
  );
};

export default UserInfo;
