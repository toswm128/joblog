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
export type focusIndex = number;
export type updater = number;

export type WriteEditorStateType = {
  body: line[];
  trashList: { body: line[]; focusLine: focusLine }[];
  focusLine: focusLine;
  head: head;
  focusIndex: focusIndex;
  updatter: updater;
};
