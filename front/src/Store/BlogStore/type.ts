export type blog = {
  idx: number;
  title: string;
  context: string;
  userIdx: number;
  writer: string;
  regdata: string;
  likes: number;
  views: number;
};

export type BlogStateType = {
  blogList: blog[];
};
