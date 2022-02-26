import { WriteEditorStateType } from "./type";

const WriteEditorState: WriteEditorStateType = {
  body: [
    {
      id: 0,
      text: "궁금하다면",
      tag: "div",
      next: 2,
      prev: null,
      src: "",
      isImg: false,
    },
    {
      id: 1,
      text: "팔로우",
      tag: "div",
      next: null,
      prev: 2,
      src: "",
      isImg: false,
    },
    {
      id: 2,
      text: "아무말도마 어어우",
      tag: "div",
      next: 1,
      prev: 0,
      src: "",
      isImg: false,
    },
  ],
  trashList: [],
  focusLine: 0,
  head: 0,
};

export default WriteEditorState;
