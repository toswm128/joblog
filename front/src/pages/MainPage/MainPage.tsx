import React from "react";
import Header from "components/header";
import BoardItem from "components/BoardItem";
import { MainContainer } from "./MainPageStyle";

const MainPage = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
      </MainContainer>
    </>
  );
};

export default MainPage;
