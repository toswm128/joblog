import MyBoards from "./MyBoards";
import MyInfo from "./MyInfo";
import { MyContainer } from "./MyStyle";

const My = () => {
  return (
    <MyContainer>
      <MyInfo />
      <MyBoards />
    </MyContainer>
  );
};

export default My;
