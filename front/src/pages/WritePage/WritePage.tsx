import Header from "components/header";
import WriteEditor from "components/WriteEditor";
import React, { useState } from "react";
import { WritePageContainer, WirtePageContainer } from "./WritePageStyle";

const WritePage = () => {
  const [file, setFile] = useState<File>();
  const [src, setSrc] = useState<string>();
  return (
    <>
      <Header />
      <WritePageContainer>
        {src ? (
          <label htmlFor="banner">
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={src}
              alt=""
            />
          </label>
        ) : (
          <label htmlFor="banner">이미지 없음</label>
        )}
        <input
          type="file"
          id="banner"
          onDrop={e => {
            e.preventDefault();
            console.log(e);
            setFile(e.dataTransfer.files[0]);
            setSrc(URL.createObjectURL(e.dataTransfer.files[0]));
          }}
          onChange={e => {
            if (e.target.files && e.target.files.length) {
              let fileData = e.target.files[0];
              setFile(fileData);
              setSrc(URL.createObjectURL(fileData));
            }
          }}
          style={{ width: "0px" }}
        />
        <WirtePageContainer>
          <WriteEditor />
        </WirtePageContainer>
      </WritePageContainer>
    </>
  );
};

export default WritePage;
