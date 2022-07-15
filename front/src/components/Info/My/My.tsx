import { InfoContainer } from "../InfoStyle";
import useAuthAPI from "hooks/API/useAuthAPI";
import useBlogAPI from "assets/API/useBlogAPI";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import MyInfo from "./MyInfo";
import NewBlogs from "components/common/NewBlogs";
import { myBreakPoints } from "assets/breakpoints/breakpoints";

const My = () => {
  const { GetUser } = useAuthAPI();
  const { getMyBoard } = useBlogAPI();

  const {
    data: { data: myInfo } = {},
    isFetching: isMyInfoFetching,
    isError: isMyInfoError,
  } = useQuery("myInfo", GetUser, {
    onError: (error: AxiosError) => {
      console.log(error.response?.status);
    },
  });

  return (
    <InfoContainer>
      <MyInfo isFetching={isMyInfoFetching || isMyInfoError} info={myInfo} />
      <NewBlogs
        breakpoints={myBreakPoints}
        infiniteFuc={getMyBoard}
        querykey={"myBlogs"}
      />
    </InfoContainer>
  );
};

export default My;
