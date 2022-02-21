import Header from "components/header";
import WriteEditor from "components/WriteEditor";
import useWrite from "hooks/write";
import React, { useState } from "react";
import { WritePageContainer, WirtePageContainer } from "./WritePageStyle";

const WritePage = () => {
  const [text, setText] = useState<string | undefined>(undefined);
  const [a, sa] = useState<string | undefined>(undefined);

  const title = useWrite();

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
