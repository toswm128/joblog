import EditorList from "./EditorList";
import { WriteComponent } from "../WriteStyle";
import EditorBanner from "./EditorBanner/EditorBanner";
import EditorTitle from "./EditorTitle/EditorTitle";

const WriteEditor = () => {
  return (
    <>
      <EditorBanner />
      <WriteComponent>
        <EditorTitle />
        <EditorList />
      </WriteComponent>
    </>
  );
};

export default WriteEditor;
