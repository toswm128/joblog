import React, { useEffect } from "react";
import Header from "components/header";
import BoardItem from "components/BoardItem";
import { MainPageContainer } from "./MainPageStyle";
import BlogAPI from "assets/API/BlogAPI";
import useBlog from "hooks/blog";
import { useQuery } from "react-query";
import { blog } from "Store/BlogStore/type";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { getBlog } = new BlogAPI();
  const { data } = useQuery("getBoard", getBlog);
  return (
    <>
      <Header />
      <MainPageContainer>
        {data?.data.data.map(
          (current: blog, key: React.Key | null | undefined) => (
            <Link to={`/detail/${current.idx}`} key={key}>
              <BoardItem data={current} />
            </Link>
          )
        )}
      </MainPageContainer>
    </>
  );
};

export default MainPage;
