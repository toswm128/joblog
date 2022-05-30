import AuthAPI from "assets/API/AuthAPI";
import { useQuery } from "react-query";
import { MyInfoContainer } from "../MyStyle";

const MyInfo = () => {
  const { GetUser2Id } = new AuthAPI();

  const { data: { data } = {} } = useQuery("myInfo", GetUser2Id);

  return (
    <MyInfoContainer>
      <img src={data?.data.profile} alt="" />
      <div>
        <h2>{data?.data.name}</h2>
      </div>
    </MyInfoContainer>
  );
};

export default MyInfo;
