export type line = {
  id: number;
  text: string | undefined;
  tag: string;
};

export type WriteEditorStateType = {
  body: line[];
};
