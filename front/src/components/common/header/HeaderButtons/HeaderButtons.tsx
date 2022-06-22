import useAuthAPI from "hooks/API/useAuthAPI";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import DefaultButton from "components/common/Buttons/DefaultButton";
import Profile from "components/common/Profile";
import log_out from "assets/png/log_out.png";

const HeaderButtons = () => {
  const { GetUser } = useAuthAPI();
  const queryClient = useQueryClient();

  const {
    isSuccess,
    isFetching,
    data: { data } = {},
  } = useQuery("myInfo", GetUser, {
    enabled: localStorage.getItem("AccessToken") ? true : false,
  });

  console.log(data);
  return (
    <>
      {isSuccess ? (
        <>
          <Link to={"/write"}>
            <DefaultButton isAbled={false} size={"M"}>
              <>글작성</>
            </DefaultButton>
          </Link>
          <Profile isMe={true} idx={data.id} src={data.profile} />
          {/* <div
            onClick={() => {
              localStorage.removeItem("AccessToken");
              axios.defaults.headers.common["Authorization"] = "";
              queryClient.invalidateQueries("myInfo");
            }}
          >
            로그아웃
          </div> */}
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
