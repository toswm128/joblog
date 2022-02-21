export type line = {
  id: number;
  text: string | undefined;
  tag: string;
  isFocus: boolean;
};

export type focusLine = number;

export type WriteEditorStateType = {
  body: line[];
  focusLine: focusLine;
};
