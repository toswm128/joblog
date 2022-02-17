import React from "react";
import { lineData } from "../WriteEditorType";

const EditorInputter = ({ data }: { data: lineData }) => {
  return <input type="text" value={data.text} />;
};

export default EditorInputter;
