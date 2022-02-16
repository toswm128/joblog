import Header from "components/header";
import React, { useState } from "react";
import { useEffect } from "react";
import { WritePageContainer, WirtePageContainer } from "./WritePageStyle";

const WritePage = () => {
  const [text, setText] = useState<string | undefined>(undefined);
  const [a, sa] = useState<string | undefined>(undefined);

  return (
    <>
      <Header />
      <WritePageContainer>
        <label htmlFor="banner">이미지 없음</label>
        <input type="file" id="banner" style={{ width: "0px" }} />
        <WirtePageContainer>
          {a ? (
            <div onClick={() => sa(undefined)} className="title">
              {text}
            </div>
          ) : (
            <input
              type="text"
              className="title"
              placeholder="제목을 입력해주세요..."
              onChange={e => setText(e.target.value)}
              value={text}
            />
          )}
          <input type="text" onClick={() => sa("a")} />
          <input type="text" />
        </WirtePageContainer>
      </WritePageContainer>
    </>
  );
};

export default WritePage;
