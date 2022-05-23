import AuthAPI from "assets/API/AuthAPI";
import axios from "axios";
import useUser from "hooks/user";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

const HeaderButtons = () => {
  const { GetUser2Id } = new AuthAPI();
  const { setUser } = useUser();
  const queryClient = useQueryClient();

  const {
    isSuccess,
    isFetching,
    data: { data } = {},
  } = useQuery("myInfo", GetUser2Id, {
    retry: false,
  });

  useEffect(() => {
    isSuccess &&
      setUser({
        userId: data.data.idx,
        name: data.data.name,
        profile: data.data.porfile,
      });
  }, [isFetching]);

  return (
    <>
      {isSuccess ? (
        <>
          <Link to={"/my"} className="header-authBtn">
            {data?.data.name}
          </Link>
          <div
            className="header-authBtn"
            onClick={() => {
              localStorage.removeItem("AccessToken");
              axios.defaults.headers.common["Authorization"] = "";
              queryClient.invalidateQueries("myInfo");
            }}
          >
            로그아웃
          </div>
        </>
      ) : (
        <>
          <Link to={"/login"} className="header-authBtn">
            로그인
          </Link>
          <Link to={"/join"} className="header-authBtn">
            회원가입
          </Link>
        </>
      )}
    </>
  );
};

export default HeaderButtons;
