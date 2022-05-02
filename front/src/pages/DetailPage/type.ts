export type board = {
  data: data;
  msg: string;
  result: string;
};

export type data = {
  blog: blog;
  comments: comments;
  user: user;
};

export type blog = {
  banner: string;
  context: string;
  idx: number;
  regdate: string;
  title: string;
  userIdx: number;
};

export type comments = [{ text: string; userId: number }];

export type user = { name: string };
