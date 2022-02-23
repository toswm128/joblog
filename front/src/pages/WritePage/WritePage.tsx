import Header from "components/header";
import WriteEditor from "components/WriteEditor";
import React from "react";
import { WritePageContainer, WirtePageContainer } from "./WritePageStyle";

const WritePage = () => {
  return (
    <>
      <Header />
      <WritePageContainer>
        <label htmlFor="banner">이미지 없음</label>
        <input type="file" id="banner" style={{ width: "0px" }} />
        <WirtePageContainer>
          <WriteEditor />
        </WirtePageContainer>
      </WritePageContainer>
    </>
  );
};

export default WritePage;
