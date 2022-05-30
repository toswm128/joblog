export type idx = number;
export type name = string;
export type profile = string;

export type UserType = {
  idx: idx;
  name: name;
  profile: profile;
};

export type user = {
  data: UserType;
};
