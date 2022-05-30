export type idx = number | undefined;
export type name = string | undefined;
export type profile = string | undefined;

export type UserType = {
  idx: idx;
  name: name;
  profile: profile;
};

export type user = {
  data: UserType;
};
