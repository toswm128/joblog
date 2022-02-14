import React from "react";
import Header from "components/header";
import BoardItem from "components/BoardItem";
import { MainPageContainer } from "./MainPageStyle";

const MainPage = () => {
  return (
    <>
      <Header />
      <MainPageContainer>
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
      </MainPageContainer>
    </>
  );
};

export default MainPage;
