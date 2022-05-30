import AuthAPI from "assets/API/AuthAPI";
import { useQuery } from "react-query";
import { MyInfoContainer } from "../MyStyle";

const MyInfo = () => {
  const { GetUser } = new AuthAPI();

  const { data: { data } = {} } = useQuery("myInfo", GetUser, {
    select: data => data.data,
  });

  return (
    <MyInfoContainer>
      <img src={data?.profile} alt="" />
      <div>
        <h2>{data?.name}</h2>
      </div>
    </MyInfoContainer>
  );
};

export default MyInfo;
