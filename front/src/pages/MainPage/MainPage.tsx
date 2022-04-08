import React, { useEffect } from "react";
import Header from "components/header";
import BoardItem from "components/BoardItem";
import { MainPageContainer } from "./MainPageStyle";
import BlogAPI from "assets/API/BlogAPI";
import useBlog from "hooks/blog";

const MainPage = () => {
  const { getBlog } = new BlogAPI();
  const { getBlogs } = useBlog();
  useEffect(() => {
    getBlog().then(result => result && getBlogs(result.data.data));
  }, [getBlog]);
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
