export type line = {
  id: number;
  text: string;
  tag: string;
  next: number | null;
};

export type focusLine = number;
export type head = number;

export type WriteEditorStateType = {
  body: line[];
  trashList: line[];
  focusLine: focusLine;
  head: head;
};
