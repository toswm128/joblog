import produce from "immer";
import { createReducer } from "typesafe-actions";
import { CLOSE_MODAL, OPEN_MODAL } from "./action";
import ModalState from "./state";
import { ModalStateType } from "./type";

export default createReducer<ModalStateType>(ModalState, {
  [OPEN_MODAL]: (state, action) =>
    produce(state, (draft) => {
      draft.isOpen = true;
      draft.titleText = action.payload.titleText;
      draft.context = action.payload.context;
      draft.buttonFuc = action.payload.buttonFuc;
    }),
  [CLOSE_MODAL]: (state, action) =>
    produce(state, (draft) => {
      draft.isOpen = false;
      draft.titleText = "";
      draft.context = "";
      draft.buttonFuc = () => {};
    }),
});
