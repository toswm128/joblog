import { UserType } from "types/UserTypes/type";
import { InfoComponent } from "../../InfoStyle";
import Settings from "./Settings";

interface IUserInfo {
  isFetching: boolean;
  info: UserType;
}

const MyInfo = ({ isFetching, info }: IUserInfo) => {
  return (
    <InfoComponent>
      {!isFetching && (
        <>
          <img src={info?.profile} alt="" />
          <div>
            <h2>{info?.name}</h2>
          </div>
          <Settings />
        </>
      )}
    </InfoComponent>
  );
};

export default MyInfo;
