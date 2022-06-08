import { UserType } from "types/UserTypes/type";
import { InfoComponent } from "../../InfoStyle";
import Settings from "./Settings";

export const MyInfoLoader = () => {
  return (
    <>
      <img style={{ backgroundColor: "#c4c4c4" }} />
      <div>
        <h2></h2>
      </div>
      <Settings />
    </>
  );
};

interface IUserInfo {
  isFetching: boolean;
  info: UserType;
}

const MyInfo = ({ isFetching, info }: IUserInfo) => {
  return (
    <InfoComponent>
      {isFetching ? (
        <MyInfoLoader />
      ) : (
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
