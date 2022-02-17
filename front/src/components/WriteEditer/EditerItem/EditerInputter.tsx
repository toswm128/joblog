import React from "react";
import { lineData } from "../WriteEditerType";

const EditerInputter = ({ data }: { data: lineData }) => {
  return <input type="text" value={data.text} />;
};

export default EditerInputter;
