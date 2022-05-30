import { UserType } from "types/UserTypes/type";

export type board = {
  data: data;
  msg: string;
  result: string;
};

export type data = {
  blog: blog;
  comments: comments;
  user: UserType;
  likes: likes;
};

export type blog = {
  banner: string;
  context: string;
  idx: number;
  regdate: string;
  title: string;
  userIdx: number;
};

export type comments = comment[];

export type comment = {
  text: string;
  name: string;
  profile: string;
  regdate: string;
};

export type like = { userIdx: number };

export type likes = [like];
