import MyBoards from "./MyBoards";
import MyInfo from "./MyInfo";
import { InfoContainer } from "../InfoStyle";

const My = () => {
  return (
    <InfoContainer>
      <MyInfo />
      <MyBoards />
    </InfoContainer>
  );
};

export default My;
