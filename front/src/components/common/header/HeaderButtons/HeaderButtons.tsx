import useAuthAPI from "hooks/API/useAuthAPI";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DefaultButton from "components/common/Buttons/DefaultButton";
import Profile from "components/common/Profile";

const HeaderButtons = () => {
  const { GetUser } = useAuthAPI();

  const { isSuccess, data: { data } = {} } = useQuery("myInfo", GetUser, {
    enabled: localStorage.getItem("AccessToken") ? true : false,
  });

  return (
    <>
      <Link to={"/write"}>
        <DefaultButton isAbled={false} size={"M"}>
          <>글작성</>
        </DefaultButton>
      </Link>
      {isSuccess ? (
        <>
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
