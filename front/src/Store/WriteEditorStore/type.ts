export type line = {
  id: number;
  text: string | undefined;
  tag: string;
  next: number | null;
};

export type focusLine = number;
export type head = number;

export type WriteEditorStateType = {
  body: line[];
  focusLine: focusLine;
  head: head;
};
