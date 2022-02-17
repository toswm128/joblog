import { useState } from "react";

const useWrite = () => {
  const [text, setText] = useState<string | undefined>("");

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return { text, changeText };
};

export default useWrite;
