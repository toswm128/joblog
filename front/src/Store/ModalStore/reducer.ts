import produce, { enableMapSet } from "immer";
import { createReducer } from "typesafe-actions";
import { CLOSE_MODAL, OPEN_MODAL } from "./action";
import ModalState from "./state";
import { ModalStateType } from "./type";

enableMapSet();

export default createReducer<ModalStateType>(ModalState, {
  [OPEN_MODAL]: (state, action) =>
    produce(state, (draft) => {
      draft.isOpen = true;
      draft.type = action.payload.type;
      if (action.payload.option) {
        draft.Modals.set(draft.type, action.payload.option);
      }
    }),
  [CLOSE_MODAL]: (state) =>
    produce(state, (draft) => {
      draft.isOpen = false;
    }),
});
