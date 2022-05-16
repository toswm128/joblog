export type blog = {
  banner: string;
  idx: number;
  title: string;
  context: string;
  userIdx: number;
  name: string;
  regdate: string;
  likes: number;
  views: number;
};

export type BlogStateType = {
  blogList: blog[];
};
