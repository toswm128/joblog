import React, { useState, useEffect } from "react";
import useWrite from "hooks/write";
import { lineData } from "./WriteEditerType";
import EditerInputter from "./EditerItem/EditerInputter";

const WriteEditer = () => {
  const title = useWrite();
  const [line, setLine] = useState<Array<lineData>>([
    {
      id: 0,
      text: "신기해",
      tag: "div",
    },
    {
      id: 1,
      text: "팔다리가 앞뒤로 막",
      tag: "div",
    },
    {
      id: 2,
      text: "움 움 움직이는게",
      tag: "div",
    },
  ]);
  return (
    <>
      <input
        type="text"
        className="title"
        placeholder="제목을 입력해주세요..."
        onChange={e => title.changeText(e)}
        value={title.text}
      />

      {line.map(current => (
        <EditerInputter data={current} />
      ))}
    </>
  );
};

export default WriteEditer;
