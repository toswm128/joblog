import BlogAPI from "assets/API/BlogAPI";
import useUser from "hooks/user";
import { useQuery } from "react-query";
import Main from "../Main";
import BoardList from "../Main/BoardList";
import { MyBoards, MyContainer, MyInfo } from "./MyStyle";

const My = () => {
  const { user } = useUser();
  const { getBlog } = new BlogAPI();
  const { data, isLoading } = useQuery("getBoard", getBlog);

  return (
    <MyContainer>
      <MyInfo>
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
      </MyInfo>
      <MyBoards>{data && <BoardList blogList={data?.data.data} />}</MyBoards>
    </MyContainer>
  );
};

export default My;
