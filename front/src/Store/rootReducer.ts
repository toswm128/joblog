import { createSelectorHook } from "react-redux";
import { combineReducers } from "redux";
import { ModalStateType } from "./ModalStore/type";

import WriteEditorReducer from "./WriteEditorStore/reducer";
import ModalReducer from "./ModalStore/reducer";
import { WriteEditorStateType } from "./WriteEditorStore/type";

const rootReducer = combineReducers({
  WriteEditor: WriteEditorReducer,
  Modal: ModalReducer,
});

export type RootStateType = {
  WriteEditor: WriteEditorStateType;
  Modal: ModalStateType;
};

export const useTypedSelector = createSelectorHook<RootStateType>();

export default rootReducer;
