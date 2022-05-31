import My from "components/Blog/My";
import Loader from "components/common/Loader";
import { useIsFetching } from "react-query";

const MyPage = () => {
  const isFetching = useIsFetching();
  console.log(isFetching);
  return <>{isFetching ? <Loader /> : <My />}</>;
};

export default MyPage;
