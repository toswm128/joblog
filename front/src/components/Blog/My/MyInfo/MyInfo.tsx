import useUser from "hooks/user";
import { MyInfoContainer } from "../MyStyle";

const MyInfo = () => {
  const { user } = useUser();
  return (
    <MyInfoContainer>
      <img
        src={
          user.profile
            ? user.profile
            : "http://localhost:5000/image?file=user.png"
        }
        alt=""
      />
      <div>
        <h2>{user.name}</h2>
      </div>
    </MyInfoContainer>
  );
};

export default MyInfo;
