import { WriteEditorStateType } from "./type";

const WriteEditorState: WriteEditorStateType = {
  body: [
    {
      id: 0,
      text: "신기해",
      tag: "div",
      next: 3,
    },
    {
      id: 1,
      text: "팔다리가 앞뒤로 막 막",
      tag: "div",
      next: 2,
    },
    {
      id: 2,
      text: "움 움 움직이는게",
      tag: "div",
      next: null,
    },
    {
      id: 3,
      text: "연결리스트",
      tag: "div",
      next: 1,
    },
  ],
  focusLine: 0,
  head: 0,
};

export default WriteEditorState;
