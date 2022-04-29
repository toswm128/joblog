import UserState from "./state";
import { UserStateType } from "./type";
import { SET_USER } from "./action";
import { createReducer } from "typesafe-actions";
import produce from "immer";

export default createReducer<UserStateType>(UserState, {
  [SET_USER]: (state, action) =>
    produce(state, draft => {
      draft.userId = action.payload.userId;
      draft.name = action.payload.name;
    }),
});
