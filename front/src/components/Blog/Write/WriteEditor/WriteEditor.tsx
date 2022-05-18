import { useEffect } from "react";
import useWrite from "hooks/write";
import { useState } from "react";
import EditorList from "./EditorList";
import { WriteComponent } from "../WriteStyle";

const WriteEditor = () => {
  const { WriteEditorState, setTitle, setBanner } = useWrite();
  const { title, banner } = WriteEditorState;
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    banner && setSrc(URL.createObjectURL(banner));
  }, [banner]);

  return (
    <>
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
          setBanner(e.dataTransfer.files[0]);
          setSrc(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onChange={e => {
          if (e.target.files && e.target.files.length) {
            let fileData = e.target.files[0];
            setBanner(fileData);
            setSrc(URL.createObjectURL(fileData));
          }
        }}
        style={{ width: "0px" }}
      />
      <WriteComponent>
        <input
          type="text"
          className="title"
          placeholder="제목을 입력해주세요..."
          onChange={e => setTitle(e.target.value)}
          value={title}
        />

        <EditorList />
      </WriteComponent>
    </>
  );
};

export default WriteEditor;
