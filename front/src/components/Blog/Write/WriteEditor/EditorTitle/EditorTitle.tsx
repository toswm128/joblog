import useWrite from "hooks/write";
import { useState } from "react";

const EditorTitle = () => {
  const [text, setText] = useState("");
  const { setTitle } = useWrite();
  return (
    <input
      type="text"
      className="title"
      placeholder="제목을 입력해주세요..."
      onChange={e => setText(e.target.value)}
      value={text}
      onBlur={() => setTitle(text)}
    />
  );
};

export default EditorTitle;
