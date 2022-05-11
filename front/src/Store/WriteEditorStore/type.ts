export type line = {
  id: number;
  text: string;
  tag: string;
  next: number | null;
  prev: number | null;
  src: string;
};

export type focusLine = number | null;
export type head = number;
export type focusIndex = number;
export type updater = number;
export type banner = Blob | undefined;
export type title = string;

export type WriteEditorStateType = {
  title: title;
  banner: banner;
  body: line[];
  trashList: { type: string; payload: any }[];
  focusLine: focusLine;
  head: head;
  focusIndex: focusIndex;
  updatter: updater;
  setTexter: boolean;
  setFocuser: Boolean;
};
