import React, { useEffect } from "react";
import Header from "components/header";
import BoardItem from "components/BoardItem";
import { MainPageContainer } from "./MainPageStyle";
import BlogAPI from "assets/API/BlogAPI";
import useBlog from "hooks/blog";
import { useQuery } from "react-query";
import { blog } from "Store/BlogStore/type";

const MainPage = () => {
  const { getBlog } = new BlogAPI();
  // const { getBlogs, blogs } = useBlog();
  const { data } = useQuery("getBoard", getBlog);
  // useEffect(() => {
  //   getBlog().then(result => result && getBlogs(result.data.data));
  // }, [getBlog]);
  return (
    <>
      <Header />
      <MainPageContainer>
        {data?.data.data.map(
          (current: blog, key: React.Key | null | undefined) => (
            <BoardItem data={current} key={key} />
          )
        )}
      </MainPageContainer>
    </>
  );
};

export default MainPage;
