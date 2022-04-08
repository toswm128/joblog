import { createSelectorHook } from "react-redux";
import { combineReducers } from "redux";
import { BlogStateType } from "./BlogStore/type";

import WriteEditorReducer from "./WriteEditorStore/reducer";
import BlogReducer from "./BlogStore/reducer";
import { WriteEditorStateType } from "./WriteEditorStore/type";

const rootReducer = combineReducers({
  WriteEditor: WriteEditorReducer,
  Blog: BlogReducer,
});

export type RootStateType = {
  WriteEditor: WriteEditorStateType;
  Blog: BlogStateType;
};

export const useTypedSelector = createSelectorHook<RootStateType>();

export default rootReducer;
