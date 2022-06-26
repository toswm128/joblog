import produce from "immer";
import { createReducer } from "typesafe-actions";
import { CLOSE_MODAL, OPEN_MODAL } from "./action";
import ModalState from "./state";
import { ModalStateType } from "./type";

export default createReducer<ModalStateType>(ModalState, {
  [OPEN_MODAL]: (state, action) =>
    produce(state, (draft) => {
      draft.isOpen = true;
      draft.type = action.payload.type;
    }),
  [CLOSE_MODAL]: (state, action) =>
    produce(state, (draft) => {
      draft.isOpen = false;
    }),
});
