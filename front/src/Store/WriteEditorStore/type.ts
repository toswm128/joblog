export type line = {
  id: number;
  text: string;
  tag: string;
  next: number | null;
  prev: number | null;
  src: string;
  isImg: boolean;
};

export type focusLine = number | null;
export type head = number;

export type WriteEditorStateType = {
  body: line[];
  trashList: line[];
  focusLine: focusLine;
  head: head;
};
